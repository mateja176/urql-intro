import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, Provider } from 'urql';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    },
  },
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
