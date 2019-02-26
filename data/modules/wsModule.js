var socket
import gameNodeModule from './gameNodeModule.js'
var updateGameNode=gameNodeModule.updateGameNode
var renderGameNode=gameNodeModule.renderGameNode
socket=new WebSocket('ws://'+window.location.hostname+':8080')
console.log('!')
socket.onmessage=e=>{
    var data = JSON.parse(e.data)
    socket.send(data.id)
    updateGameNode(data)
}

var send = (round_id, choice) => {
    var data = JSON.stringify([round_id, choice])
    socket.send(data)
}

export default send
