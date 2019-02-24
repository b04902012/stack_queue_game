import cookieModule from './cookieModule.js'

var pre_data
var gameNode
var stack_node
var queue_node
var stack_button
var queue_button
var stack_content
var queue_content
var rank_node
var rank_list=[]
var renderGameNode=()=>{
    gameNode = document.getElementsByClassName('game_container')[0]
    stack_node = document.createElement('div')
    queue_node = document.createElement('div')
    stack_node.classList.add('stack')
    queue_node.classList.add('queue')

    stack_button = document.createElement('span')
    stack_button.classList.add('stack_button')
    queue_button = document.createElement('span')
    queue_button.classList.add('queue_button')
    stack_button.innerText = '<stack>'
    queue_button.innerText = '<queue>'

    stack_content = document.createElement('span')
    queue_content = document.createElement('span')
    stack_node.appendChild(stack_button)
    stack_node.appendChild(document.createTextNode('  <->  '))
    stack_node.appendChild(stack_content)
    queue_node.appendChild(queue_button)
    queue_node.appendChild(document.createTextNode('   ->  '))
    queue_node.appendChild(queue_content)
    queue_node.appendChild(document.createTextNode('  ->'))
    gameNode.appendChild(queue_node)
    gameNode.appendChild(stack_node)
}
var getGameData=()=>{
    return pre_data
}

var updateGameNode=(data)=>{
    console.log(data)
    var id = cookieModule.get('id')
    var stack_list = data.u[id].s
    var queue_list = data.u[id].q
    stack_content.innerText = JSON.stringify(stack_list.reverse())
    queue_content.innerText = JSON.stringify(queue_list.reverse())
    pre_data = data
}
export default {updateGameNode,renderGameNode,getGameData}
