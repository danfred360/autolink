FROM node:23

WORKDIR /app

COPY dist/bundle.js .

EXPOSE 3000

CMD ["node", "bundle.js"]