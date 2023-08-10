#each instruction in a docker file results 
#in a single new image layer being created
#then put ontop of last layer created 
#this way only need to changes layer
#that changed and every layer after it

#base image layer
FROM python:3.10-slim-bullseye
#building our image layer on top of base image layer 
RUN apt-get update \
    && apt-get install -y --no-install-recommends --no-install-suggests \
    build-essentials default-libmysqlclient-dev \
    && pip install --no-cache-dir --upgrade pip
WORKDIR /app
#reason copy sepreate(first) from rest of application 
#so we can make sure our requirements are in a sep layer so
#if our application code changes we can still use the cache
#requirement layer (no need to reinstall or recreate layer)   
COPY ./requirements.txt /app
RUN pip install --no-cache-dir --requirement /app/requirements.txt
COPY . /app

EXPOSE 5000

CMD ["python3", "server.py"]