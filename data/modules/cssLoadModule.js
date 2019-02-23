var loadCSS=(path,properties={})=>{
    let cssLink=document.createElement('link')
    cssLink.rel='stylesheet'
    cssLink.type='text/css'
    cssLink.href=path
    for(let p in properties)
        cssLink[p]=properties[p]
    document.getElementsByTagName('head')[0].appendChild(cssLink)
}
export default loadCSS
