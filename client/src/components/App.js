import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// BrowserRouter (brain ) tells react router how to behave, looks at currentURL and change the set of components visible
// on the scree
// Route used to setup a rule between the url and component

const Header = () => <h2> Header </h2>
const Dashboard = () => <h2> Dashboard </h2>
const LandingPage = () => <h2> LandingPage </h2>
const SurveyNew = () => <h2> SurvewNew </h2>

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <div>
          <Route path="/" component={Header} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/surveys" component={Dashboard} />
          </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
