import cookieModule from './cookieModule.js'
import promptNode from './promptModule.js'
import Fetch from './fetchModule.js'
import getNewNode from './newNodeModule.js'
import getLoginNode from './loginNodeModule.js'
import userModule from './userModule.js'
var newNode=getNewNode()
var loginNode=getLoginNode()
var getHeaderNode=async()=>{
    let header_node=document.createElement('div')
    header_node.id='header'
    
    let title_node=document.createElement('div')
    title_node.appendChild(document.createTextNode('Handsomorphism'))
    title_node.id='headerTitle'
    let bar_node=document.createElement('div')
    bar_node.id='headerBar'

    let author_node=document.createElement('div')
    author_node.appendChild(document.createTextNode('AUTHOR'))
    author_node.classList.add('headerButton')
    author_node.classList.add('headerButton1')
    author_node.onclick=()=>{
        window.location.href='/author'}

    let blog_node=document.createElement('div')
    blog_node.appendChild(document.createTextNode('BLOG'))
    blog_node.classList.add('headerButton')
    blog_node.classList.add('headerButton2')

    let new_node=document.createElement('div')
    new_node.appendChild(document.createTextNode('NEW'))
    new_node.classList.add('headerButton')
    new_node.classList.add('headerButton3')
    new_node.onclick=newFunc

    let user_node=document.createElement('div')
    if(await userModule.getCurrentUser()===''){
        user_node.appendChild(document.createTextNode('LOGIN'))
        user_node.onclick=loginFunc
    }
    else{
        user_node.appendChild(document.createTextNode('LOGOUT'))
        user_node.onclick=logoutFunc
    }
    user_node.classList.add('headerButton')
    user_node.classList.add('headerButton4')
    
    title_node.onclick=()=>{
        window.location='/'
    }

    bar_node.appendChild(author_node)
    bar_node.appendChild((()=>{
        let node=document.createElement('div')
        node.style.width='0px'
        node.style.height='1em'
        node.style.top='0.25em'
        node.style.position='relative'
        node.style.display='inline-block'
        node.style.borderLeft='1px rgba(255,255,255,0.5) solid'
        return node
    })())
    bar_node.appendChild(blog_node)

    bar_node.appendChild(title_node)

    bar_node.appendChild(new_node)
    bar_node.appendChild((()=>{
        let node=document.createElement('div')
        node.style.width='0px'
        node.style.height='1em'
        node.style.top='0.25em'
        node.style.position='relative'
        node.style.display='inline-block'
        node.style.borderLeft='1px rgba(255,255,255,0.5) solid'
        return node
    })())
    bar_node.appendChild(user_node)

    
    header_node.appendChild(bar_node)
    return header_node
}
function backgroundNode(color){
    let node=document.createElement('div')
    node.classList.add('headerButtonBg')
    node.style.backgroundColor=color
}
function newFunc(){
    promptNode(newNode)
}
function loginFunc(){
    promptNode(loginNode)
}
function logoutFunc(){
    userModule.logoutUser()
}
export default {getHeaderNode}
