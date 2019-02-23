var fs=require('fs')
var extractBody=require('./serverModule').extractBody
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
}
