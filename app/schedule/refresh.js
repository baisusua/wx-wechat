const Subscription = require('egg').Subscription;

class Refresh extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '110m', // 110 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }
    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        const data = await this.ctx.service.token.refreshToken();
        if (data.access_token) {
            const res = await this.ctx.service.token.saveToken(data.access_token);
        } else {
            this.ctx.service.token.unitllGetToken();
        }
    }
}

module.exports = Refresh;