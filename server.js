var http=require('http')
var url=require('url')
var path=require('path')
var qs=require('querystring')
var fs=require('fs')
var router=require('./router')
var ws=require('ws')
var serverModule = require('./serverModule')
var userModule = require('./userModule')
var userList = require('./userList')
var User = new userModule()

var srv=http.createServer(async function(req,res){
    console.log(req.url)
    let pathname=url.parse(req.url).pathname
    if(pathname[0]==='/')pathname=pathname.substr(1)
    let datapath=new URL('./data/'+pathname,'https://localhost').pathname.substr(1)
    fs.stat(datapath,async function(err,stats){
        console.log(datapath)
        if(stats&&stats.isFile()){
            if(path.extname(datapath)==='.css'){
                res.writeHead(200,{'Content-Type':'text/css'})
                fs.createReadStream(datapath).pipe(res)
                return
            }
            if(path.extname(datapath)==='.js'){
                res.writeHead(200,{'Content-Type':'text/javascript'})
                return fs.createReadStream(datapath).pipe(res)
            }
            res.writeHead(404,{'Content-Type':'text/html'})
            res.end('404 not found')
            return
        }
        else{
            router(pathname,req,res)
        }
    })
})
srv.listen('8080')
const ws_srv=new ws.Server({server:srv})
var socket_table = userList
var cache_data = ""
var update = data=>{
    cache_data = data
    socket_table.foreach(user=>{
        socket_table[user].foreach(socket=>{
            socket.send(data)
        })
    })
}

for(var user in userList)
    socket_table[user]=new Set()

ws_srv.on('connection',(socket,req)=>{
    var cookie=serverModule.extractCookie(req)
    console.log(cookie)
    var user = userModule.getUser(cookie)
    if(user.length){
        socket_table[user].add(socket)
        console.log(req.headers)
        if(clientSocket.readyState===ws.OPEN&&clientSocket!=socket){
            clientSocket.send(data)
        }
    }
})
