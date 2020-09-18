FROM registry.cn-shanghai.aliyuncs.com/qcy_docker/nodejs-cnpm

RUN mkdir -p /code
COPY ./ /code
WORKDIR /code
RUN ["cnpm", "install"]
ENTRYPOINT ["cnpm", "run", "serve"]
