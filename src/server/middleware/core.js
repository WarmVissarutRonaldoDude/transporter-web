import bodyParser from 'koa-bodyparser';

function initCore(app) {
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
