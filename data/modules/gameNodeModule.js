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
rank_node = document.createElement('div')
rank_node.classList.add('rank')
gameNode.appendChild(rank_node)
var getGameData=()=>{
    return pre_data
}

var updateGameNode=(data)=>{
    console.log(data)
    if(!rank_list.length){
        for(let i=0;i<data.m.length;i++){
            rank_list.push({
                n:0,
                d:document.createElement('div'),
                m:document.createElement('span'),
                s:document.createElement('span'),
            })
            rank_list[i].m.innerText=data.m[i]
            rank_list[i].s.innerText='0'
            rank_list[i].d.appendChild(rank_list[i].m)
            rank_list[i].d.appendChild(rank_list[i].s)
            rank_node.appendChild(rank_list[i].d)
        }
    }
    for(var i=0;i<data.m.length;i++)
        if(data.u[i].d)
            rank_list[i].d.classList.add('sent')
    if(!pre_data||data.r>pre_data.r){
        for(var i=0;i<data.m.length;i++){
            if(!data.u[i].d)
                rank_list[i].d.classList.remove('sent')
            rank_list[i].n=0
            data.u[i].s.forEach(k=>rank_list[i].n+=k)
            data.u[i].q.forEach(k=>rank_list[i].n+=k)
            rank_list[i].s.innerText=rank_list[i].n.toString()
        }
        var sorted_list=rank_list.sort(sorted_list,(a,b)=>{return a.n<b.n})
    }
    var id = cookieModule.get('id')
    var stack_list = data.u[id].s
    var queue_list = data.u[id].q
    stack_content.innerText = JSON.stringify(stack_list.reverse())
    queue_content.innerText = JSON.stringify(queue_list.reverse())
    pre_data = data
}
var updateRankNode
export default {updateGameNode,getGameData}
