import express from 'express';
import {createServer} from 'node:http'; //connects express instance and socket server

import {Server} from 'socket.io';

import cors from 'cors';

import mongoose from 'mongoose';
import {connectToSocket} from './controllers/socketManager.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));


const start = async () => {
    app.set("mongo_user");
    const connectionDB = await mongoose.connect("mongodb+srv://yutika386_db_user:bL6QGwYKBYuebFqA@cluster0.86j6nlb.mongodb.net");
    console.log(`MongoDB connected on Host: ${connectionDB.connection.host}`);
    server.listen((app.get("port")), () => {
        console.log("LISTENING ON PORT 8000");
    });

};

start();
