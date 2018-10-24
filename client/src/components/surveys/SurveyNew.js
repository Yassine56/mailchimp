 import React, { Component } from 'react';
 import reduxForm from 'redux-form';
 import SurveyForm from './SurveyForm';
// SurveyNew shows both SurveyForm and SurveyFormReview
 class SurveyNew extends Component {
   render () {
     return (
       <div>
            <h3>Survey New</h3>
            <SurveyForm />
       </div>
     );
   }
 }

export default SurveyNew;
