// contains user inputs
import _ from 'lodash';
import React, {Component} from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {label: 'Survey Title', name :'title'},
  {label: 'Subject Line', name :'subject'},
  {label: 'Email Body', name :'body'},
  {label: 'Recipients List', name :'emails'}
]

class SurveyForm extends Component {
  renderFormFields(){
    return (
      _.map(FIELDS, ({label, name}) => {
        return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      })
    )
  }
  render() {
    return (
      <div>
          <h3>SurveyForm</h3>
          <Form
             onSubmit={this.props.handleSubmit(values => {console.log(values);})}
          >

          {this.renderFormFields()}
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
          <Link to="/surveys" className="red btn-flat white-text">
          Cancel
          </Link>

          </Form>
      </div>
    )
  }

}
function validate(values){
  const errors = {};
  errors.emails = validateEmails(values.emails || '');
  _.each(FIELDS,({name}) => {
    if(!values[name]){
      errors[name]='You must provide a '+ name;
    }
  })

  return errors;
}


export default reduxForm({
  validate,
  form : 'SurveyForm'
})(SurveyForm)
