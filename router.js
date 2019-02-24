var fs=require('fs')
var extractBody=require('./serverModule').extractBody
var extractCookie = require('./serverModule').extractCookie
var getKey = require('./userModule').getKey
var getUser = require('./userModule').getUser
module.exports=async(path,req,res)=>{
    path=path.split('/')[0]
    console.log('Path:'+path)
    console.log(req.method==='GET')
    console.log(path.length)
    if(req.method==='GET'){
        if(path===''){
            var cookie = extractCookie(req)
            res.writeHead(200,{'Content-Type':'text/html'})
            console.log(typeof(getUser(cookie)))
            if(typeof(getUser(cookie))==='number')
                return fs.createReadStream('data/main.html').pipe(res)
            else
                return fs.createReadStream('data/login.html').pipe(res)
        }
    }
    else if(req.method==='POST'){
        var user_data = JSON.parse(await extractBody(req))
        var session = getKey(user_data)
        if(session){
            console.log(session)
            res.writeHead(200,{
                'Set-Cookie': [
                    `id=${session.id}`,
                    `key=${session.key}; HttpOnly`,
                ]
            })
            return res.end(JSON.stringify(session))
        }
        res.writeHead(401)
        return res.end()
    }
    res.writeHead(404)
    return res.end()
}
