#
# Node.js Dockerfile
#
# https://github.com/dockerfile/nodejs
#

# Pull base image.
FROM node


# Define working directory.
WORKDIR /data

# Define default command.
CMD ["bash"]