import path from 'path';
import views from 'koa-views';

function initViews(app) {
  const viewsFolder = path.resolve(__dirname, 'views');

  app.use(views(viewsFolder, {
    map: {
      html: 'dust',
    },
  }));
}

module.exports = { initViews };
