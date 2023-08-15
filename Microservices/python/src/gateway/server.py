import os, gridfs, pika, json
from flask import Flask, request
from flask_pymongo import PyMongo 
from auth import validate
from auth_svc import access 
from stoarge import util

server = Flask(__name__)
# config to mongo db on localhost 
server.config["MONGO_URI"] = "mongodb://host.minikube.internal:27017/videos"
#pymongo will wrap flask server which will allow us to 
#interface with our mongodb 
mongo = PyMongo(server)
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
fs = gridfs.GridFS(mongo.db)
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
#convert json string to python object 
    access = json.loads(access)

    if access["admin"]:
        if len(request.files) > 1 or len(request < 1):
            return "exact one file plya", 400
        for _, f in request.files.items():
            err = util.upload(f, fs, channel, access)

            if err:
                return err
        return "you did it plya", 200
    else:
        return "nice try not authorized", 401 
    
@server.route("/download", methods=["GET"])
def download():
    pass

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
