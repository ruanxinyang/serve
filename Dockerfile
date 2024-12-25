FROM node:21-alpine

WORKDIR /root/serve
COPY . .
# 更换 npm 源为官方源
# RUN npm config set registry https://registry.npmjs.org/
# RUN npm install
# 容器对外暴露的端口号，要和node项目配置的端口号一致
EXPOSE 3017

# 容器启动时执行的命令
CMD [ "node", "app.js" ]
#ZIMXPZBKZBBSVNJQFIUHJIDITUIXKCFN