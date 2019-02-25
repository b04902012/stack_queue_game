import cookieModule from './cookieModule.js'

var pre_data
var operation_node
var game_node
var stack_node
var queue_node
var stack_button
var queue_button
var stack_content
var queue_content
var operation_list=[]
var rank_node
var rank_list=[]
operation_node = document.getElementsByClassName('operation_container')[0]
game_node = document.getElementsByClassName('game_container')[0]
rank_node = document.getElementsByClassName('rank_container')[0]
var title_node = document.createTextNode(`
 `)

var current_operation_node = document.createElement('div')
game_node.appendChild(current_operation_node)
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
game_node.appendChild(queue_node)
game_node.appendChild(stack_node)
rank_node.classList.add('rank')
var getGameData=()=>{
    return pre_data
}

var updateGameNode=(data)=>{
    console.log(data)
    data.p+='e'
    if(!rank_list.length){
        for(let i=0;i<data.m.length;i++){
            rank_list.push({
                n:0,
                d:document.createElement('div'),
                m:document.createElement('span'),
                s:document.createElement('span'),
            })
            rank_list[i].m.innerText=data.m[i]
            rank_list[i].m.classList.add('name')
            rank_list[i].s.classList.add('score')
            rank_list[i].d.appendChild(rank_list[i].m)
            rank_list[i].d.appendChild(rank_list[i].s)
            rank_node.appendChild(rank_list[i].d)
            console.log(i)
        }
    }
    if(!operation_list.length){
        for(let i=0;i<data.p.length;i++){
            operation_list.push(document.createElement('div'))
            if(data.p[i]==='i')
                operation_list[i].innerText = 'Push'
            if(data.p[i]==='o')
                operation_list[i].innerText = 'Pop'
            if(data.p[i]==='e')
                operation_list[i].innerText = 'End'
            if(data.p[i]==='?')
                operation_list[i].innerText = '???'
            operation_list[i].classList.add('operation')
            operation_node.appendChild(operation_list[i])
        }
    }
    for(var i=0;i<data.m.length;i++)
        if(data.u[i].d)
            rank_list[i].d.classList.add('sent')
    if(!pre_data||data.r>pre_data.r){
        if(data.p[data.r]==='i')
            operation_list[data.r].innerText = 'Push'
        if(data.p[data.r]==='o')
            operation_list[data.r].innerText = 'Pop'
        if(data.p[data.r]==='e')
            operation_list[data.r].innerText = 'End'
        if(data.p[data.r]==='?')
            operation_list[data.r].innerText = '???'
        for(let i=0;i<data.p.length;i++)
            operation_list[i].classList.remove('current_operation')
        operation_list[data.r].classList.add('current_operation')
        if(data.p[data.r]==='i')
            current_operation_node.innerText = 'Please push '+ data.n[data.r].toString()+'.'
        if(data.p[data.r]==='o')
            current_operation_node.innerText = 'Please pop.'
        if(data.p[data.r]==='e')
            current_operation_node.innerText = 'Game over.'
        for(var i=0;i<data.m.length;i++){
            if(!data.u[i].d)
                rank_list[i].d.classList.remove('sent')
            rank_list[i].n=0
            data.u[i].s.forEach(k=>rank_list[i].n+=k)
            data.u[i].q.forEach(k=>rank_list[i].n+=k)
            rank_list[i].s.innerText=rank_list[i].n.toString()
        }
        var sorted_list=rank_list.slice()
        sorted_list.sort((a,b)=>{return b.n-a.n})
        console.log(sorted_list)
        for(let i=0;i<sorted_list.length;i++)
            rank_node.appendChild(sorted_list[i].d)
    }
    var id = cookieModule.get('id')
    var stack_list = data.u[id].s
    var queue_list = data.u[id].q
    if(data.p[data.r]==='i'){
        if(data.u[id].d==='s')
            stack_list.push(data.n[data.r])
        if(data.u[id].d==='q')
            queue_list.push(data.n[data.r])
    }
    if(data.p[data.r]==='o'){
        if(data.u[id].d==='s')
            stack_list.pop()
        if(data.u[id].d==='q')
            queue_list.shift()
    }
    if(data.u[id].d||data.r===data.n.length){
        queue_button.classList.add('disabled')
        stack_button.classList.add('disabled')
    }
    else{
        queue_button.classList.remove('disabled')
        stack_button.classList.remove('disabled')
    }
    rank_list[id].d.classList.add('self_rank')
    stack_content.innerText = JSON.stringify(stack_list.reverse())
    queue_content.innerText = JSON.stringify(queue_list.reverse())
    pre_data = data
}
var updateRankNode
export default {updateGameNode,getGameData}
