const userList = require('./userList')

var sessionTable = []
var sessionSet = new Set()
for(index in userList)sessionTable[index]=new Set()
var newSession = ()=>{
    var key = Math.floor(Math.random()*(1<<30))
    console.log(key)
    while(sessionSet.has(key))
        key = Math.floor(Math.random()*(1<<30))
    sessionSet.add(key)
    return key.toString(16)
}
var getUser=(cookie)=>{
    var id = parseInt(cookie.id)
    var key = cookie.key
    if(sessionTable[id]&&sessionTable[id].has(key))
        return id
}
var  getKey=(userData)=>{
    console.log(typeof(userData))
    var user = userData.user
    var pass = userData.pass
    console.log(user)
    console.log(pass)
    for(id in userList){
        if(userList[id].user===user && userList[id].pass===pass){
            var key = newSession()
            sessionTable[id].add(key)
            return {id,key}
        }
    }
}
module.exports={getUser,getKey}
