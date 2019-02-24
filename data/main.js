import Fetch from './modules/fetchModule.js'
import getGameNode from './modules/gameNodeModule.js'
var data
console.log('!')
var loadPromise = new Promise((res,rej)=>{
    window.addEventListener('load',()=>{
        res()
    })
})
