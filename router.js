var fs=require('fs')
var extractBody=require('./serverModule').extractBody
var extractCookie = require('./serverModule').extractCookie
var getKey = require('./userModule').getKey
var getUser = require('./userModule').getUser
module.exports=async(path,req,res)=>{
    path=path.split('/')
    console.log('Path:'+path)
    if(req.method==='GET'){
        var cookie = extractCookie(req)
        res.writeHead(200,{'Content-Type':'text/html'})
        if(cookie)
            fs.createReadStream('data/main.html').pipe(res)
        else
            fs.createReadStream('data/login.html').pipe(res)
    }
    else if(req.method==='POST'){
        if(path[0]==='login'){
            var user_data = await extractBody(req)
            var session = getKey(user_data)
            if(session){
                res.writeHead(200,{
                    'Set-Cookie': `id=${session.id};key=${session.key}`,
                    'Location': './',
                })
                return res.end()
            }
            res.writeHead(401)
            return res.end()
        }
    }
    console.log(res)
    res.writeHead(404)
    return res.end()
}
