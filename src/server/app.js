import Koa from 'koa';
import { initCore } from './middleware/core';
import { initWebpack } from './webpack';
import { initRoutes } from './routes';

const port = process.env.PORT || 6484;
const app = new Koa();

initCore(app);
initWebpack(app);
initRoutes(app);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
