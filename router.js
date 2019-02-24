var fs=require('fs')
var extractBody=require('./serverModule').extractBody
var extractCookie = require('./serverModule').extractCookie
var getKey = require('./userModule').getKey
var getUser = require('./userModule').getUser
module.exports=async(path,req,res)=>{
    path=path.split('/')
    console.log('Path:'+path)
    console.log(req.method==='GET')
    if(req.method==='GET'){
        var cookie = extractCookie(req)
        res.writeHead(200,{'Content-Type':'text/html'})
        console.log('!')
        if(typeof(getUser)==='number')
            return fs.createReadStream('data/main.html').pipe(res)
        else
            return fs.createReadStream('data/login.html').pipe(res)
    }
    else if(req.method==='POST'){
        var user_data = JSON.parse(await extractBody(req))
        var session = getKey(user_data)
        if(session){
            console.log(session)
            res.writeHead(200)
            return res.end(JSON.stringify(session))
        }
        res.writeHead(401)
        return res.end()
    }
    res.writeHead(404)
    return res.end()
}
