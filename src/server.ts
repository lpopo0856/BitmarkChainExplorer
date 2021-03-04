import app from "./app"
import { Server, Socket } from "socket.io";
import config from "./config/ormConfig"
import { latestBlock } from  "./utils/websocket";

(new app(config)).app.listen(3000, () => {
    console.log('Express server listening on Port ', 3000);
})

export const io = new Server(3030, {
  cors: {
    origin: process.env.HOST+":8080",
    methods: ["GET"]
  }
});

io.on("connect", (socket: Socket) => {
    socket.emit("latestBlock", latestBlock);
});

import * as schedule from "node-schedule"
import { webSocketUtil } from "./utils/websocket"

const job = schedule.scheduleJob('*/3 * * * * *', function () {
    new webSocketUtil().getLatestBlock()
});