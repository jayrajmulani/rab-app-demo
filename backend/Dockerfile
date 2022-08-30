FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python3-pip python3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN pip3 install -r requirements.txt

ENTRYPOINT [ "flask" ]
CMD [ "run" , "--host=0.0.0.0" ,"--port=4000"]