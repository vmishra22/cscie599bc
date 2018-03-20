FROM alpine:3.7
RUN apk add --no-cache mongodb && \
    rm /usr/bin/mongoperf
VOLUME /data/db
EXPOSE 27017 27017
RUN cd /root && wget https://raw.githubusercontent.com/mvertes/docker-alpine-mongo/3.6.3-0/run.sh
ENTRYPOINT [ "/root/run.sh" ]
CMD [ "mongod", "--bind_ip", "0.0.0.0" ]