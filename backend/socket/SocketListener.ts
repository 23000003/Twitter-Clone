import { Server } from "socket.io";

export function SocketListener(io : any){

    io.on('connection', (socket : any) => {
        console.log('A user connected:', socket.id);

        //Optional as i already put in the controlelr
        socket.on('postLiked', ({ data } : any) => {
            io.emit('postLiked', { data });
        });

        socket.on('postUnliked', ({ data } : any) => {
            io.emit('postUnliked', { data });
        });

        socket.on('postReposted', ({ data } : any) => {
            io.emit('postReposted', { data });
        });

        socket.on('postUndoRepost', ({ data } : any) => {
            io.emit('postUndoRepost', { data });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    })

}