import React, { Component } from 'react';

class Landing extends Component {
  render(){
    return(
      <div style = {{ textAlign : "center" }}>
        <h1 >
          MailChimp
        </h1>
          Use My App please !!

      <div className="row">
          <div className="col s12 m12">
              <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                      <span className="card-title">Card Title</span>
                      <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                  </div>
              <div className="card-action">
                  <a href="#">This is a link</a>
                  <a href="#">This is a link</a>
              </div>
              </div>
          </div>
      </div>
      </div>

    )
  }
}
export default Landing;
