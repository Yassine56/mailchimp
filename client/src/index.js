// data layer control layer. (redux)

import 'materialize-css/dist/css/materialize.min.css';
import App from './components/App'
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import {FETCH_USER} from './actions/types';

import reducers from './reducers';
import axios from 'axios';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk) );
window.store = store;
window.axios = axios;

ReactDOM.render(<Provider store={store}><App /></Provider>,document.querySelector('#root'));

console.log("stripe key :", process.env.REACT_APP_STRIPE_KEY);
