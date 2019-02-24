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
var gameModule = require('./gameModule')

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
var socket_table = new Array(userList.length)
var cache_data = ""
var update = data=>{
    cache_data = data
    socket_table.forEach(socket_set=>{
        socket_set.forEach(socket=>{
            socket.send(data)
        })
    })
    console.log(data)
}

for(var user in userList)
    socket_table[user]=new Set()

// TODO: set game arguments
var game = new gameModule.Game(3, "iio", [-1, 2, -1], update, 10)

ws_srv.on('connection',(socket,req)=>{
    var cookie=serverModule.extractCookie(req)
    console.log(cookie)
    var user = userModule.getUser(cookie)
    if(typeof(user)==='number'){
        socket_table[user].add(socket)
        console.log(req.headers)
        socket.send(cache_data)
        socket.on('message',(message)=>{
            var request = JSON.parse(message);
            game.DoMove(user, request[1], request[0]);
        })
    }
})
