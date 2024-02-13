FROM node:18.17
ENV REFRESHED_AT "19-07-2023"

WORKDIR /app

EXPOSE 8080
CMD ["sh", "-c", "yarn install --ignore-optional && yarn dev"]
