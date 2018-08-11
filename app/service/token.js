const Service = require('egg').Service;
class Token extends Service {
    async refreshToken() {
        const id = this.config.wechat.id;
        const secret = this.config.wechat.secret;
        const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + id + '&secret=' + secret;
        const res = await this.ctx.curl(url, {
            dataType: 'json',
        });
        console.log(res);
        return res.data;
    }
    async saveToken(token) {
        const res = await this.app.redis.set('access_token', token);
        return res;
    }
    async getToken() {
        const res = await this.app.redis.get('access_token');
        return res;
    }
    async unitllGetToken() {
        let data = await this.refreshToken();
        if (data.access_token) {
            const res = await this.saveToken(data.access_token);
            if (res == 'OK') {
                if (timmer) {
                    clearInterval(timmer);
                }
            }
        } else {
            setTimeout(() => {
                this.unitllGetToken();
            }, 30000)
        }
    }
}
module.exports = Token;