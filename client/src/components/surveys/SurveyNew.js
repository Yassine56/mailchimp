 import React, { Component } from 'react';
 import {reduxForm} from 'redux-form';
 import SurveyForm from './SurveyForm';
 import SurveyFormReview from './SurveyFormReview';

// SurveyNew shows both SurveyForm and SurveyFormReview
 class SurveyNew extends Component {
   // constructor(props) {
   //   super(props);
   //   this.state = {formReview : false};
   // }
   state = {showFormReview : false};
   renderContent() {
     if (this.state.showFormReview){
       return (<SurveyFormReview
         onCancel={()=>this.setState({showFormReview : false})}
          />)
     }
     else{
       return (<SurveyForm
         onSurveySubmit={() => this.setState({ showFormReview : true })}
         / >)
       }
   }
   render () {
     return (
       <div>
            <h3>Survey New</h3>
            {this.renderContent()}
       </div>
     );
   }
 }

export default reduxForm({
  form : 'SurveyForm'
})(SurveyNew);
