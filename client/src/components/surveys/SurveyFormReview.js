import React from 'react';
import {connect} from 'react-redux';
import  FIELDS from './formfields';
import _ from 'lodash';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

  const reviewFields = _.map(FIELDS, ({name,label}) => {
    return(
      <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]} </div>
      </div>
    )
  })

  return (
    <div>
        <h5>please confirm your entries</h5>
        <div>
            {reviewFields}
        </div>
        <button className="yellow darken-3 btn-flat white-text"
           onClick={onCancel}
          >
        Back
        </button>
        <button
          onClick={() => submitSurvey(formValues,history)}
          className="green btn-flat right white-text" >
          Send Survey
          <i className="material-icons right">email
          </i>
        </button>
    </div>
  )
}
function mapStateToProps({form:{SurveyForm:{values}}}){
  console.log(values);
  return {
    formValues : values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
