import os, gridfs, pika, json
from flask import Flask, request, send_file 
from flask_pymongo import PyMongo 
from auth import validate
from auth_svc import access 
from storage import util
from bson.objectid import ObjectId

server = Flask(__name__)
# config to mongo db on localhost 
#pymongo will wrap flask server which will allow us to 
#interface with our mongodb 
mongo_video = PyMongo(
    server,
    uri="mongodb://host.minikube.internal:27017/videos"
    )
mongo_mp3 = PyMongo(
    server,
    uri="mongodb://host.minikube.internal:27017/mp3s"
    )
#gridfs will wrap mongodb which will allow us to use mongodb
#gridfs
#using mongodb to store files Binaryjsondocumentsize
#max size is 16 megabytes. this is so no file used exssesive amount of ram or bandwidth 
#gridfs allows us to work with files larger than 16MB
#gridfs stores a file by braking the file into chunks than 
#storing each chunk in its own document
#this avoids performance issues of storing files more than 16MB
#2 collections in gridfs one for files chunks and one for files 
#metadata so the chunks can be put back together 
fs_videos = gridfs.GridFS(mongo_video.db)
fs_mp3s = gridfs.GridFS(mongo_mp3.db)
#makes communcation with RABITMQ sync
connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
channel = connection.channel()

@server.route("/login", methods=["POST"])
def login():
    token, err = access.login(request)

    if not err:
        return token
    else:
        return err

@server.route("/upload", methods=["POST"])
def upload():
#need to make sure user has token from login
    access, err  = validate.token(request) 
    if err:
        return err
#convert json string to python object 
    access = json.loads(access)

    if access["admin"]:
        if len(request.files) > 1 or len(request < 1):
            return "exact one file plya", 400
        for _, f in request.files.items():
            err = util.upload(f, fs_videos, channel, access)

            if err:
                return err
        return "you did it plya", 200
    else:
        return "nice try not authorized", 401 
    
@server.route("/download", methods=["GET"])
def download():
    #need to make sure user has token from login
    access, err  = validate.token(request) 
    if err:
        return err
#convert json string to python object 
    access = json.loads(access)

    if access["admin"]:
        fid_string = request.args.get("fid")
        
        if not fid_string:
            return "fid is required", 400
       
        try:
            out = fs_mp3s.get(ObjectId(fid_string))
            return send_file(out, download_name=f'{fid_string}.mp3')
        
        except Exception as err:
            print(err)
            return "internal server error", 500

    return "not authorized", 401
    

if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8080)



#when user uplaods video to be converted to mp3 request will first hit gatway which will store video on mongodb
#then put msg on queue(rabbitmq) leeting downstream services know there is a 
#video to be processed in our mongodb the video to mp3 converter service will consume
#msgs from our rabbitmq then get the ID from the msg, pull that video from the mongodb
#convert the video than store the new mp3 in mongodb and write an new msg in rabbitmq
#that says the conversion job is done 
#notification service takes this msg then emails the client 
#saying the new mp3 is rdy for donwload 
#client will use unique id from email plus JWT to make req to api
#gateway  to download the mp3, api gateway will pull mp3 from mongodb than serve it to the client 
