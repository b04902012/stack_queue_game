import Fetch from './modules/fetchModule.js'
var data
console.log('!')
window.addEventListener('load', async ()=>{
    document.getElementById('login').onclick=()=>{
        var user = document.getElementById('user').value
        var pass = document.getElementById('pass').value
        Fetch('login',JSON.stringify({user,pass})).then(res=>{
            if(res.status===200){
                
            }
        })
    }
})
