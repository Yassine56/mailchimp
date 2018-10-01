import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers ({
  // whatever key we put into the combinereducer are gonna be present into the state object.
  auth : authReducer
});
