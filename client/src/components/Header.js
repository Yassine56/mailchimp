import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

class Header extends Component {

  rendercontent(){
    console.log(this.props.auth);
    switch(this.props.auth){
      case false :
          return (
            <li >

              <li  key="google"><a className="waves-effect waves-light btn" href="/auth/google"> Login with Google </a></li>
              <li key="facebook"><a className="waves-effect waves-light btn" href="/auth/facebook"> Login with Facebook </a></li>
            </li>
          );
      case  null:
          return;
      default :
      console.log(this.props.auth);
          return([
            <li key="1"><Payment /></li>,
            <li key="3" style={{margin : '0px 10px'}}> Credits: { this.props.auth.user.credits} </li>,
            <li key="2">
              <a href="/api/logout"> Logout </a>
            </li>

          ]);
    }
  }


  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to= {this.props.auth ? '/surveys' : '/' }
            className="brand-logo">MailChimp</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
              { this.rendercontent() }
          </ul>
        </div>
      </nav>
    )
  }
}
function mapStateToProps({auth}){ // mapStateToProps({auth}) es6 syntax // state.auth
  return { auth : auth };
}

export default connect(mapStateToProps)(Header);
