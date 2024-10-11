import { Server } from 'socket.io';
import http from 'http';

/**
 * 
 * @param io Refactoring this soon
 */


export function InitSocket(server: http.Server) {
    
    const io = new Server(server, {
        cors: {
            origin: process.env.PRODUCTION_URL  ,
            methods: ["GET", "POST"],
        }
    });

    return io; 
};
