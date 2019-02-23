var socket
console.log('!')
window.addEventListener('load',()=>{
    socket=new WebSocket('ws://localhost:8080')
    socket.onmessage=e=>{
        console.log(e.data)
    }
})
