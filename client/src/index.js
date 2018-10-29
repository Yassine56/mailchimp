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

const store = createStore(reducers, {}, applyMiddleware(reduxThunk) );
window.store = store;

ReactDOM.render(<Provider store={store}><App /></Provider>,document.querySelector('#root'));

console.log("stripe key :", process.env.REACT_APP_STRIPE_KEY);
