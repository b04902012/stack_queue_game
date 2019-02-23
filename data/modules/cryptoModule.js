const crypto = require('crypto')
const pbkdf2 = crypto.pbkdf2Sync
const N = require('./config').N

hex2a=(hex)=>{
    var str=''
    for(i=0;i<64;i+=2)
        str+=String.fromCharCode(parseInt(hex.substr(i,2)))
    return str
}

hash=(s,n,salt='')=>{
    for(let i=0;i<n;i++){
        s=s+salt
        let sha256=crypto.createHash('sha256')
        sha256.update(s)
        s=sha256.digest('hex')
    }
    return s
}

encrypt=(data,key,iv)=>{
    key=pbkdf2(key,'',N,32,'sha256')
    let cipher=crypto.createCipheriv('aes256', key, iv)
    let encrypted=cipher.update(data,'utf8','hex')
    encrypted+=cipher.final('hex')
    return encrypted
}

decrypt=(data,key,iv)=>{
    key=pbkdf2(key,'',N,32,'sha256')
    let decipher=crypto.createDecipheriv('aes256',key,iv)
    let decrypted=decipher.update(data,'hex','utf8')
    decrypted+=decipher.final('utf8')
    return decrypted
}

export default{
    'hex2a':hex2a,
    'hash':hash,
    'encrypt':encrypt,
    'decrypt':decrypt,
}
