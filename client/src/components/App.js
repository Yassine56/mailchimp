import React , {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
// BrowserRouter (brain ) tells react router how to behave, looks at currentURL and change the set of components visible
// on the scree
// Route used to setup a rule between the url and component

import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

/////////////

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
  return (
    <div className="container">
      <BrowserRouter>
          <div>
            <Route  path="/" component={Header} />
            <Route  path="/surveys/new" component={SurveyNew} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
          </div>
      </BrowserRouter>
    </div>
  );
  }
};

export default connect(null, actions)(App); // connect react to redux and pass in all the actions to the state of app as props
