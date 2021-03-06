FROM node:6

WORKDIR /frontend

ADD package.json yarn.lock /frontend/
RUN echo "--- :yarn: Installing application deps" \
    && yarn

ADD . /frontend/
