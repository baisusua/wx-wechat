const Service = require('egg').Service;
const crypto = require('crypto')
class Check extends Service {
    CheckSignature(signature, token, timestamp, nonce, echostr) {
        const oriArray = new Array();
        oriArray[0] = nonce;
        oriArray[1] = timestamp;
        oriArray[2] = token;
        oriArray.sort();
        const str = oriArray.join('');
        const shaStr = crypto.createHash('sha1').update(str).digest('hex');
        if(signature===shaStr){
            return {
                status:true,
                data:echostr
            }
        }
        return {
            status:false,
            data:signature+'|'+shaStr
        }
    }
}
module.exports = Check;