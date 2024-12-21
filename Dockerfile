FROM node:21-alpine

# 创建容器内的项目存放目录
WORKDIR /root/node_project
# 安装 git
RUN apk add --no-cache git
RUN git config --global user.name "ruanxinyang" && git config --global user.email "1908167366@qq.com"
# 增加 Git HTTP 缓冲区大小
RUN git config --global http.postBuffer 524288000
RUN git clone https://github.com/ruanxinyang/serve.git
WORKDIR /root/node_project/serve
# 更换 npm 源为官方源
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
# 容器对外暴露的端口号，要和node项目配置的端口号一致
EXPOSE 3017

# 容器启动时执行的命令
CMD [ "node", "app.js" ]
#ZIMXPZBKZBBSVNJQFIUHJIDITUIXKCFN