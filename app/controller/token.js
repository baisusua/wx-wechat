'use strict';

const Controller = require('egg').Controller;

class TokenController extends Controller {
	async refresh() {
		//主动刷新access_token
		const data = await this.ctx.service.token.refreshToken();
		if (data.access_token) {
			const res = await this.ctx.service.token.saveToken(data.access_token);
			if (res != 'OK') {
				this.ctx.body = {
					code: 1005,
					message: '存储token失败，请检查redis连接'
				};
			} else {
				this.ctx.body = {
					code: 200,
					data: data.access_token
				};
			}
		} else {
			this.ctx.body = {
				code: 1005,
				message: '获取token失败，请稍后再试'
			};
		}
	}
	async get() {
		//获取redis中的accsee_token
		const res = await this.ctx.service.token.getToken();
		if (res) {
			this.ctx.body = {
				code: 200,
				data: res
			};
		} else {
			this.ctx.body = {
				code: 1006,
				message: '获取token失败，请稍后再试'
			};
		}
	}
}

module.exports = TokenController;