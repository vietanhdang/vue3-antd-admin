FROM node:lts-alpine as builder

ENV PROJECT_DIR=/vue3-antd-admin

WORKDIR $PROJECT_DIR

COPY package.json $PROJECT_DIR

RUN yarn config set registry https://registry.npmmirror.com
RUN yarn install


COPY ./ $PROJECT_DIR
RUN rm -rf .env.* && yarn build


FROM nginx:alpine as production


ENV SERVER_PORT 7001

ENV WS_PORT 7002

COPY  --from=builder /vue3-antd-admin/dist/ /usr/share/nginx/html
COPY ./default.conf.template /etc/nginx/templates/

EXPOSE 80
