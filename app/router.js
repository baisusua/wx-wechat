'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/', controller.home.index);
    router.get('/check', controller.check.index);
    router.get('/token/refresh', controller.token.refresh);
    router.get('/token/value', controller.token.get);
};