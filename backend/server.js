import express from 'express';
import 'dotenv/config.js';
import InitializeMongo from './config/mongoDB.js';
import { userRouter } from './routes/UserRoute.js';
import { postRouter } from './routes/PostRoute.js';
import cors from 'cors';
import http from 'http';
import SeedFakeData from './faker/seed.js';
import { commentRouter } from './routes/CommentRoute.js';
import { InitSocket } from './config/socketio.js';
import SocketListener from './socket/SocketListener.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// Error handler
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: `ERROR: ${err.message}`,
    });
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

// Connection

const server = http.createServer(app);

(async () => {
    const dbIdentify = await InitializeMongo();

    if (dbIdentify) {

        const io = InitSocket(server);

        SocketListener(io);

        server.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    } else {
        console.error('Failed to connect to MongoDB.');
    }
    
})();
