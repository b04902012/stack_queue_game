var socket
import updateGameNode from './gameNodeModule.js'
socket=new WebSocket('ws://'+window.location.hostname+':8080')
console.log('!')
socket.onmessage=e=>{
    console.log(e.data)
    var data = JSON.parse(e.data)
    socket.send(data.id)
    updateGameNode(data)
}

var send = (round_id, choice) => {
    var data = JSON.parse([round_id, choice])
    socket.send(data)
}

export default send
