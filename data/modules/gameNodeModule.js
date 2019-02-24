import cookieModule from './cookieModule.js'
var pre_n = -1, pre_u = -1
var getGameNode=(data)=>{
    if(data.n<pre_n)
        return
    var num_u = 0
    for(var i=0;i<data.u.length;i++)
        if(data.u[i].d)
            num_u++
    if(pre_n == data.n && pre_u > num_u)
        return
    var id = cookieModule.get('id')
    var gameNode = document.createElement('div')
    var stack_list = data.u[id].s
    var queue_list = data.u[id].q
    stack_list=[1,2,3]
    queue_list=[4,2,0,-2]
    var stack_node = document.createElement('div')
    stack_node.classList.add('stack')
    var queue_node = document.createElement('div')
    queue_node.classList.add('queue')
    var stack_button = document.createElement('span')
    var queue_button = document.createElement('span')
    stack_button.innerText = '<stack>'
    queue_button.innerText = '<queue>'
    stack_node.appendChild(stack_button)
    stack_node.appendChild(document.createTextNode('  <->  '+JSON.stringify(stack_list.reverse())))
    queue_node.appendChild(queue_button)
    queue_node.appendChild(document.createTextNode('   ->  '+JSON.stringify(queue_list.reverse())+'   ->  '))
    gameNode.appendChild(queue_node)
    gameNode.appendChild(stack_node)
    return gameNode
}
export default getGameNode
