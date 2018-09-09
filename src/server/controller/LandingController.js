import os from 'os';
import React from 'react';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'react-redux';
import renderRoutes from '../../client/routes';
import { configureStore } from '../../client/stores';
import HTML from '../utils/HTML';

function renderContent({ store, history, routes, location }) {
    return new Promise((resolve) => {
      const sheet = new ServerStyleSheet();
  
      let content = '';
  
      match({ history, routes, location }, (error, redirectLocation, renderProps) => {
        if (renderProps) {
          content = renderToString(sheet.collectStyles(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>,
          ));
        }
  
        const styles = sheet.getStyleElement();
  
        resolve({ error, redirectLocation, content, styles });
      });
    });
}

export default class LandingController {
    static async heathCheck(ctx) {
        ctx.json({
            body: {
              status: 'OK',
              machine: os.hostname(),
              node: process.version,
            },
        });
    }

    static async getLanding(ctx) {
        const initialState = {};

        const location = ctx.request.originalUrl;
        const memoryHistory = createMemoryHistory(location);
        const routes = renderRoutes();
        const store = configureStore(memoryHistory, initialState);
        const history = syncHistoryWithStore(memoryHistory, store);

        const { error, redirectLocation, content, styles } =
        await renderContent({ store, history, routes, location });

        if (error) {
            ctx.status = 500;
        } else if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search);
        } else {
            const app = `<!DOCTYPE html>${renderToString(<HTML
                content={content}
                styles={styles}
                store={store}
            />)}`;
            ctx.body = app;
            ctx.type = 'html';
            ctx.status = 200;
        }
    }
}  