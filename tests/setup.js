const { JSDOM } = require('jsdom');
import store, { resetStore } from '../app/store'
// This helper function wraps the subscribe pattern of a redux store
// with a promise. This makes the tests a little bit more readable.
store.nextDispatch = () => {
  return new Promise((resolve) => {
    const unsubscribe = store.subscribe(() => {
      resolve();
      unsubscribe();
    })
  })
}
beforeEach(() => {
  store.dispatch(resetStore())
})

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
