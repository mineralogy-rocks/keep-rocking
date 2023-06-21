FROM node:16.17.1
ENV REFRESHED_AT "15-02-2021"

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --force

EXPOSE 8080
CMD ["yarn", "run", "dev"]
