import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Config } from "./config";

const app = express();
app.set("port", process.env.PORT || Config.port);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", function(socket: any) {
  console.log("a user connected");

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on("message", function(message: any) {
    console.log(message);
    io.emit("message", message);
  });
});

app.get("/data", (req: any, res: any) => {
    console.log("/data");
    res.send('data');
});

app.get("/api", (req: any, res: any) => {
    console.log("/api");
    res.send('api');
});

app.get("/chats", (req: any, res: any) => {
    console.log("/chats");
    res.send('chats');
});

const server = http.listen(Config.port, function() {
  console.log(`listening on *:${Config.port}`);
});