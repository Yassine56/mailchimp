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
            <li>
              <a href="/auth/google"> Login with Google </a>
            </li>
          );
      case  null:
          return;
      default :
          return([
            <li><Payment /></li>,
            <li>
              <a href="/API/logout"> Logout </a>
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
function mapStateToProps(state){ // mapStateToProps({auth}) es6 syntax // state.auth
  return { auth : state.auth };
}

export default connect(mapStateToProps)(Header);
