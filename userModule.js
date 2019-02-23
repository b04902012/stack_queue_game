const userList = require('./userList')

var sessionTable = []
var sessionSet = new Set()
for(index in userList)sessionTable[index]=new Set()
var newSession = ()=>{
    var key = Math.floor(Math.random()*(1<<32))
    while(sessionSet.has(key))
        key = Math.floor(Math.random()*(1<<32))
    sessionSet.add(key)
    return key.toString(16)
}
var getUser=(cookie)=>{
    var id = cookie.id
    var key = cookie.key
    if(sessionTable[id]&&sessionTable[id].has(userKey))
        return id
}
var  getKey=(user,pass)=>{
    for(index in userList){
        if(userList[index].user===user && userList[index].pass===pass){
            var key = newSession()
            sessionTable[index].add(key)
            return {id:index,key:key}
        }
    }
}
module.exports={getUser,getKey}
