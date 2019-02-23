var fs=require('fs')
var extractBody=require('./serverModule').extractBody
var extractCookie = require('./serverModule').extractCookie
var getKey = require('./userModule').getKey
var getUser = require('./userModule').getUser
module.exports=async(path,req,res)=>{
    path=path.split('/')
    console.log(path)
    if(req.method==='GET'){
        if(path[0]===''){
            res.writeHead(200,{'Content-Type':'text/html'})
            fs.createReadStream('data/main.html').pipe(res)
        }
        else if(path[0]==='getCurrent'){
            console.log('current')
            res.writeHead(200,{'Content-Type':'application/json'})
            res.write(JSON.stringify({'stack':[1,2,3],'queue':[4,5,6]}))
            res.end()
        }
    }
    else if(req.method==='POST'){
        if(path[0]==='login'){
            var user_data = extractBody(req)
            var sessionKey = getKey(user_data)
            if(sessionKey){
                var cookie = {id:
                response.writeHead(200,{
                    'Set-Cookie':
                })
            }
        }
    }
}
