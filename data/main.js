import gameNodeModule from './modules/gameNodeModule.js'
var updateGameNode=gameNodeModule.updateGameNode
var getGameData=gameNodeModule.getGameData
import wsSend from './modules/wsModule.js'
window.addEventListener('load',async ()=>{
    document.getElementsByClassName('stack_button')[0].onclick=()=>{
        console.log('stack')
        wsSend(getGameData().r,'s')
    }
    document.getElementsByClassName('queue_button')[0].onclick=()=>{
        console.log('queue')
        wsSend(getGameData().r,'q')
    }
})
