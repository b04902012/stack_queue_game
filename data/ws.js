var socket
import getGameNode from './modules/gameNodeModule.js'
socket=new WebSocket('ws://localhost:8080')
console.log('!')
socket.onmessage=e=>{
    console.log(e.data)
    var data = JSON.parse(e.data)
    var game_container_list = document.getElementsByClassName('game_container')
    Array.from(game_container_list).forEach(d=>{
        console.log(d)
        d.appendChild(getGameNode(data))
    })
}
