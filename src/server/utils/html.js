/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

function generateJSBundle() {
  const disableJSBundle = (process.env.DISABLE_JS_BUNDLE === 'true');
  const jsBundle = '/app/js/app.js';

  if (!disableJSBundle) {
    return (
      <script src={jsBundle} />
    );
  }

  return null;
}

const HTML = ({ content, styles, store }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Promo</title>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:400,700" />
      <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css" />
      <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css" />
      <style dangerouslySetInnerHTML={{
        __html: `
        html, body {
          height: 100%;
        }

        body {
          font-family: "ProximaNovaSoft";
          background-color: #f4f4f4;
        }

        #mount {
          height: 100%;
        }
      ` }}
      />
      {styles}
    </head>
    <body>
      <div id="mount" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__preload__ = ${serialize(store.getState())};` }} />
      {generateJSBundle()}
    </body>
  </html>
);

HTML.defaultProps = {
  content: '',
  styles: [],
};

HTML.propTypes = {
  content: PropTypes.string,
  store: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  styles: PropTypes.arrayOf(PropTypes.element),
};

export default HTML;