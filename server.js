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

var kRetryTimeout = 500;
var kRetryTimes = 5;

// Simple deep copy function, should be good enough
// https://stackoverflow.com/a/34283281
function DeepCopy(x) {
  return JSON.parse(JSON.stringify(x));
}

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

var socket_acked_id = new Array(userList.length);
for (let i = 0; i < socket_acked_id.length; i++)
    socket_acked_id[i] = {s:new Set(), m: 0};
var reliable_send = async (socket, user, data) => {
    var ack_id = socket_acked_id[user].m++;
    var data_pack = DeepCopy(data);
    data_pack.id = ack_id;
    data_pack = JSON.stringify(data_pack);
    socket.send(data_pack);
    var retry_count = 0;
    var interval_id;
    var retry = () => {
        console.log('Retry user', user);
        if (socket_acked_id[user].s.has(ack_id)) {
            clearInterval(interval_id);
            socket_acked_id[user].s.delete(ack_id);
            return;
        }
        retry_count++;
        if (retry_count > kRetryTimes) {
            clearInterval(interval_id);
            socket_acked_id[user].s.delete(ack_id);
            socket.terminate();
            socket_table[user].delete(socket)
            return;
        }
        // TODO: check if send failed
        socket.send(data_pack);
    }
    interval_id = setInterval(retry, kRetryTimeout);
}
console.log(socket_acked_id);

srv.listen('8080')
const ws_srv=new ws.Server({server:srv})
var socket_table = new Array(userList.length)
var cache_data = ""
var update = data=>{
    cache_data = data
    socket_table.forEach((socket_set, id)=>{
        socket_set.forEach(socket=>{
            reliable_send(socket, id, data)
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
        reliable_send(socket, user, cache_data)
        socket.on('message',(message)=>{
            var request = JSON.parse(message);
            if (typeof(request) === 'number')
                socket_acked_id[user].add(request);
            else
                game.DoMove(user, request[1], request[0]);
        })
   }
})
