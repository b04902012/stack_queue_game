import Fetch from './modules/fetchModule.js'
import getGameNode from './modules/gameNodeModule.js'
var data
console.log('!')
var loadPromise = new Promise((res,rej)=>{
    window.addEventListener('load',()=>{
        res()
    })
})
Promise.all([Fetch('getCurrent'),loadPromise]).then(async values=>{
    var data = JSON.parse(await values[0].text())
    var game_container_list = document.getElementsByClassName('game_container')
    console.log(game_container_list.length)
    console.log(game_container_list)
    Array.from(game_container_list).forEach(d=>{
        console.log(d)
        d.appendChild(getGameNode(data))
    })
})
