
export default function SocketListener(io){

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        //Optional as i already put in the controlelr
        socket.on('postLiked', ({ data }) => {
            io.emit('postLiked', { data});
        });

        socket.on('postUnliked', ({ data }) => {
            io.emit('postUnliked', { data });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    })

}