#this service is what converts video to mp3 using msg from rabbitmq

import pika, sys, os, time
from pymongo import MongoClient 
import gridfs
from convert import to_mp3

def main():
    #mongodb host on local machine not deployed in our cluster 
    #host minikube internal gives accsses to host system local env
    client = MongoClient("host.minikube.internal", 27017)
    db_videos = client.videos
    db_mp3s = client.mp3s
    fs_videos = gridfs.GridFS(db_videos)
    fs_mp3s = gridfs.GridFS(db_mp3s)
    #config rabbitmq connection
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host="rabbitmq")
    )
    channel = connection.channel()

    def callback(ch, method, properties, body):
        err = to_mp3.start(body, fs_videos, fs_mp3s, ch)
        if err:
           #negative acknologment which means if fails we will act like it 
           #never failed leave it on the queue to be tryied again
           #delivery_tag uniq identifies the delivery on a channel 
           #so we send this negative acknologment wit delivery_tag
           #to channel rabbit mq knows not to remove that msg from queue
           ch.basic_nack(delivery_tag=method.delivery_tag) 
        else:
           ch.basic_ack(delivery_tag=method.delivery_tag)

    #config to consume msgs from video rabbitmq
    channel.basic_consume(
        queue=os.environ.get("VIDEO_QUEUE"), on_message_callback=callback 
    )

    print("Waiting for da wor(message) CTRL+C to leave")
    #runs our consumer (listeing on channel where video msgs being put)
    channel.start_consuming()

    if __name__ == "__main__":
        try:
            main()
        except KeyboardInterrupt:
            print("stopped")
            try:
                sys.exit(0)
            except SystemExit:
                os._exit(0)


