import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import PostRoute from "./routes/PostRoute.js";
import LikeRoute from "./routes/LikeRoute.js";
import SaveRoute from "./routes/SaveRoute.js";
import RelationRoute from "./routes/RelationRoute.js";
import CommentRoute from "./routes/CommentRoute.js";
import db from "./config/Database.js";
import FileUpload from "express-fileupload";
import http from "http";
import { Server } from "socket.io";
// import mysql from "mysql";
// import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProfileRoute);
app.use(MessageRoute);
app.use(PostRoute);
app.use(SaveRoute);
app.use(CommentRoute);
app.use(RelationRoute);
app.use(LikeRoute);

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);
//
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });
//
//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
//
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// server.listen(5000, () => {
//   console.log("SERVER RUNNING");
// });

app.listen(5000, () => console.log("Server up and running..."));
