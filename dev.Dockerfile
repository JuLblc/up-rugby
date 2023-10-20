FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Note: Don't expose ports here, Compose will handle that for us
EXPOSE 3000

CMD ["npm", "run", "dev"]