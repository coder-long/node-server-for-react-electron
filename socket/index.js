/*
  server socket
*/

const socket_io = require('socket.io');
let connectHostArr = [];//连接的地址
let Socket = null

module.exports = {
    initSocketio(server) {
        //解决socket 跨域 加{cors: true}
        let io = socket_io(server, {cors: true});
        io.on('connect', (socket) => {
            socket.on('url', (url) => {
                if (connectHostArr.indexOf(url) === -1) {
                    connectHostArr.push(url);
                }
                console.log('当前连接数量:' + connectHostArr.length);
            })

            console.log('socket连接成功,连接id:', socket.id);

            Socket = socket

            socket.on('connected', (state) => {
                console.log(state + '\n');
            })

            socket.on('click1', function () {
                console.log('监听点击事件');
                var datas = [1, 2, 3, 4, 5];
                socket.emit('click2', {datas: datas});
                socket.broadcast.emit('click2', {datas: datas});
            })

        })

        //断开连接
        io.on('disconnect', (socket) => {
            console.log(socket)
            socket.on("disconnected", (state) => {
                console.log(state)
            })
        })
    },
    getSocket() {
        if (Socket) {
            return Socket
        } else {
            return null
        }
    }
}