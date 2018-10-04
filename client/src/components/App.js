import React , {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
// BrowserRouter (brain ) tells react router how to behave, looks at currentURL and change the set of components visible
// on the scree
// Route used to setup a rule between the url and component


const Dashboard = () => <h2> Dashboard </h2>;
const LandingPage = () => <h2> LandingPage </h2>;
const SurveyNew = () => <h2> SurvewNew </h2>;

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
  return (
    <div className="container">
      <BrowserRouter>
          <div>
            <Route path="/" component={Header} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/surveys" component={Dashboard} />
          </div>
      </BrowserRouter>
    </div>
  );
  }
};

export default connect(null, actions)(App); // connect react to redux and pass in all the actions to the state of app as props
