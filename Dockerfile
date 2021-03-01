FROM node

WORKDIR /tmp/bitmarkexplorer

COPY . /tmp/bitmarkexplorer
RUN npm install

EXPOSE 3000
CMD npm run ts-prod
