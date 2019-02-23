var getGameNode=(data)=>{
    var gameNode = document.createElement('div')
    console.log(data)
    var stack_list = data['stack']
    var queue_list = data['queue']
    var stack_node = document.createElement('div')
    stack_node.classList.add('stack')
    var queue_node = document.createElement('div')
    queue_node.classList.add('queue')
    stack_node.innerText = 'stack: '+JSON.stringify(stack_list)
    queue_node.innerText = 'queue: '+JSON.stringify(queue_list)
    gameNode.appendChild(queue_node)
    gameNode.appendChild(stack_node)
    return gameNode
}
export default getGameNode
