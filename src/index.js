import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Importing Redux Store Dependencies
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

// Importing Redux Reducers
import { fetchLoginReducer } from './Store/reducers'

// Importing Components
import App from './App'

// Creating Redux Store
// ***Logger must be the last middleware in chain or it will log thunk and promise not actual actions.***
const store = createStore(fetchLoginReducer, applyMiddleware(thunk, logger))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
