import express from 'express';
import 'dotenv/config.js';
import InitializeMongo from './config/mongoDB';
import { userRouter } from './routes/User.route';
import { postRouter } from './routes/Post.route';
import cors from 'cors';
import http from 'http';
// import SeedFakeData from './faker/seed.js';
import { commentRouter } from './routes/Comment.route';
import { InitSocket } from './config/socketio';
import { SocketListener } from './socket/SocketListener';
import { Response } from 'express';
import * as dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

dotenv.config();

// Routes
app.get("/", (_, res: Response) => {
    res.status(200).json({
        status: "HEY!!!!!!252Y32",
    })
})
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

// Connection

const server = http.createServer(app);

export const io = InitSocket(server);

(async () => {
    const dbIdentify = await InitializeMongo();

    if (dbIdentify) {

        SocketListener(io);

        server.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    } else {
        console.error('Failed to connect to MongoDB.');
    }
})();
