import pika, json 
#needs to upload file to our mongodb database using gridfs
#then need to put msg in rabitmq so downstream service can pull 
#msg and procees upload by pulling it from mongodb 
#this que is letting us make a async communication flow between gateway service 
#and service that processes our videos 
#which lets us avoid the need for our gateway service to have to wait till 
#our video is done being processed to communicate with the client 
def upload(f, fs, channel, access):
    try:
        fid = fs.put(f)
    except Exception as err:
        return "internal server error", 500
    message = {
        "video_fid": str(fid),
        "mp3_fid": None,
        "username": access["username"],
    }
#our producer(service that is putting msg on queue) isnt putting msgs directly on queue
#it sends msgs through an echange, echange is a middle man that allocates msgs to the right queue
#within one rabbitmq instance you can configure multiple queues
#for us we will have q for video and q for mp3
#when our producer publishes a msg to our exchange the exchange 
#will route the msgs to the right queue
#default echange(empty string) will automatically bind any queue that is created
#to it with a routing key wich is the same as the queue name  

    try: 
        channel.basic_publish(
            exchange="",
            routing_key="video",
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ),
    )
    except:
        fs.delete(fid)
        return "internal service error", 500
    