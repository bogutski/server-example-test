FROM node:12.11.1

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 5000
ENTRYPOINT ["npm"]
CMD ["run","local"]


