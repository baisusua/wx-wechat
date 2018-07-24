'use strict';

const Controller = require('egg').Controller;

class CheckController extends Controller {
    index() {
        const token = "kround";
        const signature = this.ctx.query.signature;
        const timestamp = this.ctx.query.timestamp;
        const echostr = this.ctx.query.echostr;
        const nonce = this.ctx.query.nonce;
        if (token && signature && timestamp && echostr && nonce) {
            const res = this.ctx.service.check.CheckSignature(signature, token, timestamp, nonce, echostr);
            if (res.status) {
                this.ctx.body = res.data;
            } else {
                this.ctx.body = {
                    code: 10004,
                    message: '校验失败',
                    data: res.data
                }
            }
        } else {
            this.ctx.body = {
                code: 10001,
                message: '没有query'
            }
        }
    }
}

module.exports = CheckController;