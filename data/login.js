import Fetch from './modules/fetchModule.js'
import getGameNode from './modules/gameNodeModule.js'
var data
console.log('!')
window.addEventListener('load',()=>{
    document.getElementById('login').onclick=()=>{
        var user = document.getElementById('user').value
        var pass = document.getElementById('pass').value
        var res = await Fetch('login',JSON.stringify({user,pass}))
        console.log(res)
    }
})
