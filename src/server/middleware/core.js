import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

function initCore(app) {
  app.use(cors());
  app.use(bodyParser());

  app.use(async (ctx, next) => {
    ctx.json = ({ body, code = 200 }) => {
      ctx.body = body;
      ctx.type = 'application/json';
      ctx.status = code;
    };

    await next();
  });
}

module.exports = { initCore };
