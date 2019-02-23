var extractBody=async(req)=>{
    return new Promise((res,rej)=>{
        let body=''
        req.on('data',chunk=>{
            body+=chunk.toString()
            console.log(body)
        })
        req.on('end',()=>{
            res(body)
        })
    })
}
var extractCookie=req=>{
    let cookieObject={}
    cookie=req.headers.cookie
    cookie && cookie.split(';').forEach(function(c){
        let pc=c.split('=')
        cookieObject[pc.shift().trim()]=decodeURI(pc.join('='))
    })
    return cookieObject
}
module.exports={
    extractBody,
    extractCookie,
}
