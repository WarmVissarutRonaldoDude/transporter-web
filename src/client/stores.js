import { createStore, compose, applyMiddleware, bindActionCreators } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import Polyglot from 'node-polyglot';
import reducer from './reducers';

let polyglot = null;
let tracking = null;

export function configureStore(history, initialState) {
  const isFrontend = typeof window !== 'undefined' && window.document;

  const middlewares = [
    routerMiddleware(history),
    thunk,
  ];
  let composeEnhancers = compose;
  if (isFrontend) {
    middlewares.push(logger);
    // add redux devtools support in browser
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(reducer, initialState,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );

  return store;
}

export function bindActions(actions) {
  return dispatch => ({
    actions: { ...bindActionCreators(actions, dispatch) },
  });
}


export function mapStateToProps(key) {
  return (state) => {
    const store = (state && state[key] ? state[key] : null);

    if (!polyglot) {
      polyglot = new Polyglot({
        locale: store.currentLocale,
      });

      if (store && store.locale) {
        polyglot.extend(store.locale);
      }
    }

    return { store, polyglot, tracking };
  };
}
