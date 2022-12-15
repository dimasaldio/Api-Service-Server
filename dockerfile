FROM node:16.17.1-alpine3.15
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

# start app
CMD ["npm", "start"]
