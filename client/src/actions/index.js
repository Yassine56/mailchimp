import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY } from './types';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/currentUser');
    dispatch({type : FETCH_USER , payload : res.data});
  };

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/payment', token);
  dispatch({type : FETCH_USER , payload: res.data});
}

export const submitSurvey = values => async dispatch => {
  console.log('action here');
  const res = await axios.post('/api/surveys',values);
  dispatch({type: FETCH_USER, payload: res.data});
  return { type: SUBMIT_SURVEY }
}
