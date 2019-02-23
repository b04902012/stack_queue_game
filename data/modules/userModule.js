import Fetch from './fetchModule.js'
import cookieModule from './cookieModule.js'
var getCurrentUser=async()=>{
    return (await Fetch('getUser')).text()
}
var loginUser=async(data)=>{
    console.log(data)
    console.log((await Fetch('login',JSON.stringify(data))).text())
}
var logoutUser=_=>{
    cookieModule.clear('name')
    cookieModule.clear('pass')
}
export default{
    getCurrentUser,
    loginUser,
    logoutUser,
}
