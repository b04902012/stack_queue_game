import Fetch from './modules/fetchModule.js'
var data
console.log('!')
window.addEventListener('load', async ()=>{
    cancel_login_fail()
    var login_node = document.getElementById('login')
    console.log(login_node)
    document.getElementById('user').oninput=cancel_login_fail
    document.getElementById('pass').oninput=cancel_login_fail
    login_node.onclick=()=>{
        var user = document.getElementById('user').value
        var pass = document.getElementById('pass').value
        Fetch('login',JSON.stringify({user,pass})).then(res=>{
            if(res.status===200){
                window.location.href='./'
            }
            else{
                login_fail()
            }
        })
    }
    function login_fail(){
        document.getElementById('login_fail').classList.remove('cancel')
    }
    function cancel_login_fail(){
        document.getElementById('login_fail').classList.add('cancel')
    }
    login_node.innerText = '<Login>'
})
