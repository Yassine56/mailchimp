import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {reducer as reduxForm} from 'redux-form';
import surveysReducer from './surveysReducer';

export default combineReducers ({
  // whatever key we put into the combinereducer are gonna be present into the state object.
  auth : authReducer,
  form : reduxForm,
  surveys : surveysReducer
});
