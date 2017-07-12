FROM node:8-alpine

RUN apk add --no-cache make gcc g++ python linux-headers binutils-gold

COPY package.json /code/package.json
WORKDIR /code

RUN npm install --production && \
    chmod 755 -R . && \
    apk del make gcc g++ python linux-headers binutils-gold && \
    npm prune --production && \
    rm -rf /root/.node-gyp /root/.gnupg /root/.npm /usr/share/man /tmp/* /var/cache/apk/*

COPY . /code

EXPOSE 3000

CMD ["npm", "start"]
