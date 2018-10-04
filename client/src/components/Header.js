import React , {Component} from 'react';
import { connect } from 'react-redux';

class Header extends Component {

  rendercontent(){
    console.log(this.props.auth);
    switch(this.props.auth){
      case false :
          return 'no user logged in';
      case  null:
          return 'still deciding';
      default :
          return 'user logged in';
    }
  }

  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">MailChimp</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/auth/google">{ this.rendercontent() }</a></li>
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
