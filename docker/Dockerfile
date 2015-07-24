# 使用官方的node镜像
FROM node:0.12.7

MAINTAINER Hbomb <hbomb@126.com>

# 替换掉更新源为网易的源 
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
ADD ./sources.list /etc/apt/sources.list

# 安装 ruby（用于compass编译sass）和 redis（用于session和cache）
RUN apt-get update \
    && apt-get install -y ruby ruby-dev redis-server \
    && gem sources --remove https://ruby.taobao.org/ \
    && gem sources --remove https://rubygems.org/ \
    && gem sources -a https://ruby.taobao.org/ \
    && gem install compass -V

# 生成代码目录
RUN mkdir /Code
WORKDIR /Code

# 替换npm安装源为cnpm，安装gulp和spm构建工具
RUN npm install -g  -d cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install -g -d gulp
RUN cnpm install -g -d spm@3.4.3

# 添加代码到工作目录
ADD ../../yo /Code/yo

# 运行构建脚本
RUN  cd yo && make

# 对外默认端口是3000
EXPOSE 3000

# 执行examples/yo.yohobuy-mobile
CMD ["sh","./yo/docker/run.sh"]