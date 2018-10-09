import React , {Component}  from 'react';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';
import {connect} from 'react-redux';

class Payment extends Component {
  render() {
    return(
      <StripeCheckout
        name = " MailChimp "
        description = " 5$ for 5000 surveys credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
       >
          <button className="btn">
              Add Credits !
          </button>
       </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payment);
