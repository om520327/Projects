# GATWAY SERVICE

import jwt, datetime, os
from flask import Flask, request
from flask_mysqldb import MySQL

server = Flask(__name__)
mysql = MySQL(server)

# config 
server.config["MYSQL_HOST"] = os.environ.get("MYSQL_HOST")
server.config["MYSQL_USER"] = os.environ.get("MYSQL_USER")
server.config["MYSQL_PASSWORD"] = os.environ.get("MYSQL_PASSWORD")
server.config["MYSQL_DB"] = os.environ.get("MYSQL_DB")
server.config["MYSQL_PORT"] = os.environ.get("MYSQL_PORT")

@server.route("/login", methods=["POST"])
# this route routes to function login
def login():
    auth = request.authorization
    if not auth:
        return "missing credentials",401 

# check db for credentials 
    cur = mysql.connection.cursor()
    res = cur.execute(
        "SELECT email, password FROM user WHERE email=%s", 
        (auth.username,)
    )
    if res > 0:
       user_row = cur.fetchone()
       email = user_row[0]
       password  = user_row[1] 

       if auth.username != email or auth.password != password:
           return "invalid credentials", 401
       else:
        #using secret when we create JWT and that same secret will decode the token as well
           return createJWT(auth.username, os.environ.get("JWT_SECRET"),True)
    else:
        return "invalid crdentials", 401
#route to validate jwt that will be used by our api gatway
#to validate jwt within req from the client to to work eith our app 
@server.route("/validate", method=["POST"])
def validate():
    encoded_jwt = request.headers["Authorization"]
    if not encoded_jwt:
        return "missing credentials", 401
    encoded_jwt =  encoded_jwt.split(" ")[1]
    try:
        decoded = jwt.decode(
            encoded_jwt, os.environ.get("JWT_SECRET"), 
            algorithm=["HS256"]
        )
    except:
        return "not authorized", 403
    return decoded, 200

#function to create json web token 
def createJWT(username, secret, authz):
    return jwt.encode(
        {
            "username": username,
            #seting token expire to 24hour 
            "exp": datetime.datetime.utcnow() + 
            datetime.timedelta(days =1),
            #when token is issued 
            "iat": datetime.datetime.utcnow(),
            # admin or not 
            "admin": authz,
        },
        secret,
        algorithm="HS256",
    )
# need endpoint for auth service to validate jwt
#configuring entry point 
#when we run python3 server.py "__name__" will resolve 
# to "__main__"

if __name__ == "__main__":
    #this allows our application to listen to any IP address on our host
    #tells our operatinf system to listen to all public IPS
    #default is local host which means our api wouldnt be avalible externally 
    #and sets port to 5000
    #any server needs an IP address to allow accsses from 
    #outside server our server is a docker container and are
    #app is running within the container when we spin up 
    #container it gets an ip address which means our server gets one
    #which means we can send request to our docker container
    #which in this case is our server(within docker network)
    #to enable flask application to recieve those requests 
    #we need to tell it to listen to our docker container 
    #ipaddress 
    #the host is the server that is hosting our application 
    #in our case it is the docker container that the flask app
    #is running in. so we need to tell our app to listen to our
    #docker container ipaddress
    #but since it is a docker ipaddress it is subject to change
    #so instead of setting to static ip we set it to 0.0.0.0 ip
    #which tells our app to listen to any and all our docker containers
    #ipaddress that it can find (including localhost)    

    server.run(host="0.0.0.0",port=5000)
 