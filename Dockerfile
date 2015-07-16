FROM node:0.12.7

MAINTAINER Hbomb <hbomb@126.com>

RUN apt-get update \
    && apt-get install -y ruby 
    && gem sources --remove https://ruby.taobao.org/
    && gem sources --remove https://rubygems.org/
    && gem sources -a https://ruby.taobao.org/
    && gem install compass -V

RUN mkdir /Code
WORKDIR /Code

ADD ../yoweb /Code

RUN cd yoboweb&&make

EXPOSE 3000