import cookieModule from './cookieModule.js'

var pre_data

var gameNode = document.getElementsByClassName('game_container')[0]
var stack_node = document.createElement('div')
var queue_node = document.createElement('div')
stack_node.classList.add('stack')
queue_node.classList.add('queue')

var stack_button = document.createElement('span')
var queue_button = document.createElement('span')
stack_button.innerText = '<stack>'
queue_button.innerText = '<queue>'

var stack_content = document.createElement('span')
var queue_content = document.createElement('span')
stack_node.appendChild(stack_button)
stack_node.appendChild(document.createTextNode('  <->  '))
stack_node.appendChild(stack_content)
queue_node.appendChild(queue_button)
queue_node.appendChild(document.createTextNode('   ->  '))
queue_node.appendChild(queue_content)
queue_node.appendChild(document.createTextNode('  ->'))
gameNode.appendChild(queue_node)
gameNode.appendChild(stack_node)

var updateGameNode=(data)=>{
    var id = cookieModule.get('id')
    var stack_list = data.u[id].s
    var queue_list = data.u[id].q
    stack_list=[1,2,3]
    queue_list=[4,2,0,-2]
    stack_content.innerText = JSON.stringify(stack_list.reverse())
    queue_content.innerText = JSON.stringify(queue_list.reverse())
    pre_data = data
}
export default updateGameNode
