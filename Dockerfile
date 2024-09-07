FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf node_modules

RUN npm install --omit=dev


FROM golang:1.22.0-alpine as prune

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/
COPY --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/app/package*.json /usr/src/app/

RUN go install github.com/tj/node-prune@latest

RUN node-prune

FROM node:20-alpine as production

WORKDIR /usr/src/app

COPY --from=prune /usr/src/app /usr/src/app

EXPOSE 3000

CMD ["node", "dist/main"]