import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';
import {Button, Icon, NavItem, Dropdown} from 'react-materialize';

class Header extends Component {

  rendercontent(){
    console.log(this.props.auth);
    switch(this.props.auth){
      case false :
          return ( <span>
            <Dropdown trigger={
        <Button >Easy Login</Button>
      }>

      <NavItem className=" social github"><a className="waves-effect  social github" href="/auth/github">Github</a></NavItem>
      <NavItem divider />
      <NavItem className=" social google"><a className="waves-effect  social google" icon="fa facebook" href="/auth/google">Google</a></NavItem>
      <NavItem divider />
      <NavItem className=" social facebook"><a className="waves-effect social facebook" href="/auth/facebook">Facebook</a></NavItem>
    </Dropdown>



            </span>
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
