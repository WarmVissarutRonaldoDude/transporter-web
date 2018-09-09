import Router from 'koa-router';
import LandingController from './controller/LandingController';

function initRoutes(app) {
  const router = new Router();

  router.get('/ping', LandingController.heathCheck);
  router.get('/', LandingController.getLanding);
  app.use(router.routes(), router.allowedMethods());
}

module.exports = { initRoutes };
