const Fetch=(url,data)=>{
    if(!data)return fetch(url,{
        method: "GET",
        mode: "same-origin",
        credentials: "include",
    })
    return fetch(url,{
        method: "POST",
        body:data,
        mode: "same-origin",
        credentials: "include",
    })
}
export default Fetch
