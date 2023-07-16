FROM "alpine:latest"
RUN apk add --update nodejs npm
WORKDIR /app
COPY . /app
RUN npm install
CMD ["/bin/sh", "-c", "/usr/bin/npm run dev -- --host --port 5173"]
EXPOSE 5173/tcp
