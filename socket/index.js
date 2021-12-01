/*
  server socket
*/

const socket_io = require('socket.io');

module.exports = {
  initSocketio(server) {
    let io = socket_io(server);

    io.on('connection', function (socket) {
      console.log('连接成功');

      console.log(socket.id);



      socket.on('click1', function () {
        console.log('监听点击事件');
        var datas = [1, 2, 3, 4, 5];
        socket.emit('click2', { datas: datas });
        socket.broadcast.emit('click2', { datas: datas });
      })
    })

  }
}