var socket
import updateGameNode from './modules/gameNodeModule.js'
socket=new WebSocket('ws://'+window.location.hostname+':8080')
console.log('!')
socket.onmessage=e=>{
    console.log(e.data)
    var data = JSON.parse(e.data)
    updateGameNode(data)
}
