import Fetch from './modules/fetchModule.js'
var data
console.log('!')
window.addEventListener('load', async ()=>{
    var login_node = document.getElementById('login')
    console.log(login_node)
    login_node.onclick=()=>{
        var user = document.getElementById('user').value
        var pass = document.getElementById('pass').value
        Fetch('login',JSON.stringify({user,pass})).then(res=>{
            if(res.status===200){
                
            }
        })
    }
    login_node.innerText = '<Login>'
})
