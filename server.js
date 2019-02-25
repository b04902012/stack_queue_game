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

const kRetryTimeout = 500;
const kRetryTimes = 5;

if (process.argv.length !== 4) {
  // Use hard coded file name for now
  console.log('Usage: node server.js [game configuration (json format)] [number of players (including TA)]')
  process.exit(1);
}
var gameConfig = fs.readFileSync(process.argv[2], 'ascii');
gameConfig = JSON.parse(gameConfig);
console.log(gameConfig);
const kUserNumber = parseInt(process.argv[3]);
console.log('number of user:', kUserNumber);
if (!(kUserNumber > 0)) {
  console.log('Usage: node server.js [game configuration (json format)] [number of players (including TA)]')
  console.log('Error: Argument [number of players] is NOT a positive integer');
  process.exit(1);
}
if (kUserNumber > userList.length) {
  console.log('Error: number of user set in argument is MORE THAN that in userList.js');
  process.exit(1);
}

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

var socket_acked_id = new Array(kUserNumber);
for (let i = 0; i < socket_acked_id.length; i++)
    socket_acked_id[i] = {s:new Set(), m: 0};
var reliable_send = async (socket, user, data) => {
    var ack_id = socket_acked_id[user].m++;
    var data_pack = DeepCopy(data);
    data_pack.id = ack_id;
    data_pack = JSON.stringify(data_pack);
    var retry_count = -1;
    var interval_id;
    var retry = () => {
        if (socket_acked_id[user].s.has(ack_id)) {
            console.log('user', user, 'acked message pack', ack_id);
            clearInterval(interval_id);
            socket_acked_id[user].s.delete(ack_id);
            return;
        }
        retry_count++;
        console.log('Send user', user, 'of message pack', ack_id, ', tried ' + retry_count);
        if (retry_count > kRetryTimes) {
            clearInterval(interval_id);
            socket_acked_id[user].s.delete(ack_id);
            socket.terminate();
            socket_table[user].delete(socket)
            return;
        }
        try {
            if (retry_count === 0)
                socket.send(data_pack);
            else
                socket.send('');
        } catch (e) {
            socket_acked_id[user].s.delete(ack_id);
            socket_table[user].delete(socket);
        }
    }
    interval_id = setInterval(retry, kRetryTimeout);
    retry();
}

srv.listen('8080')
const ws_srv=new ws.Server({server:srv})
var socket_table = new Array(kUserNumber)
var name_list = new Array(kUserNumber)
for(let i=0;i<kUserNumber;i++)
    name_list[i]=userList[i].user
var cache_data = ""
var update = data=>{
    cache_data = data
    data.m = name_list
    socket_table.forEach((socket_set, user)=>{
        var send_data = DeepCopy(data);
        send_data.u.forEach((u, id) => {
            if (id !== user && u.d !== false)
                send_data.u[id].d = true;
        })
        socket_set.forEach(socket=>{
            reliable_send(socket, user, send_data)
        })
    })
    console.log(data)
}

for(var user in userList)
    socket_table[user]=new Set()

var game = new gameModule.Game(kUserNumber, gameConfig[0], gameConfig[1], update, 10)

ws_srv.on('connection',(socket,req)=>{
    var cookie=serverModule.extractCookie(req)
    var user = userModule.getUser(cookie)
    if(typeof(user)==='number'){
        socket_table[user].add(socket)
        reliable_send(socket, user, cache_data)
        socket.on('message',(message)=>{
            var request = JSON.parse(message);
            console.log(request);
            if (typeof(request) === 'number')
                socket_acked_id[user].s.add(request);
            else
                game.DoMove(user, request[1], request[0]);
        })
   }
})
