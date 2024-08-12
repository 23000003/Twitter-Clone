import { Server } from 'socket.io';

let io;

export function InitSocket(server) {
    
    io = new Server(server, {
        cors: {
            origin: process.env.PRODUCTION_URL  ,
            methods: ["GET", "POST"],
        }
    });

    return io; 
};

export { io };
