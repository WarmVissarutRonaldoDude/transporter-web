import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import webpackConfig from './config/webpack.config';

function initWebpack(app) {
  const enableHMR = process.env.ENABLE_WEBPACK_HMR === 'true';

  if (!enableHMR) {
    return;
  }

  // extract webpack config and pass it to webpack
  const [clientConfig] = webpackConfig;
  clientConfig.output.path = '/';
  const compiled = webpack(clientConfig);

  // add devMiddleware to add webpacking capabilities to Koa server app
  // (instead of having a separate webpack-dev-server)
  app.use(devMiddleware(compiled, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
    },
  }));

  app.use(hotMiddleware(compiled, {
    log: console.log,
  }));
}

module.exports = { initWebpack };
