var set=(key, value)=>{
    document.cookie=encodeURIComponent(key)+'='+encodeURIComponent(value)+';max-age=2592000'
}
var clear=key=>{
    document.cookie=encodeURIComponent(key)+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
}
var get=key=>{
    key=encodeURIComponent(key)
    let cookie=document.cookie.split(';')
    let value=''
    cookie.forEach(element=>{
        let k=element.split('=')[0].trim()
        if(k===key){
            value=decodeURIComponent(element.split('=')[1])
        }
    })
    return value
}
export default{
    set,
    clear,
    get,
}
