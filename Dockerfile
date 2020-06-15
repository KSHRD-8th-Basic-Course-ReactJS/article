FROM node:latest
COPY . .
RUN npm install --silent
CMD ["node", "app.js"]