const userList = require('./userList')

var userModule=()=>{
    var sessionTable = []
    var sessionSet = new Set()
    for(index in userList)sessionTable[index]=new Set()
    var newSession = ()=>{
        var key = Math.floor(Math.random()*(1<<32))
        while(sessionSet.has(key))
            key = Math.floor(Math.random()*(1<<32))
        sessionSet.add(key)
        return key
    }
    this.getUser=(cookie)=>{
        var userId = cookie.id
        var userKey = cookie.key
        if(sessionTable[userId]&&sessionTable[userId].has(userKey))
            return userId
        return -1
    }
    this.getKey=(user,pass)=>{
        for(index in userList){
            if(userList[index].user===user && userList[index].pass===pass){
                var key = newSession()
                sessionTable[index].add(key)
                return {userId:index,userKey:key}
            }
        }
    }
}
module.exports={
    userModule
}
