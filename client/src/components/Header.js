import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';
import {Button, Icon, NavItem, Dropdown, SideNavItem, SideNav} from 'react-materialize';
import SideNavMenu from './sideNavMenu';
class Header extends Component {

  rendercontent(){
    console.log(this.props.auth);
    switch(this.props.auth){
      case false :
          return ( <li>
            <Dropdown trigger={
        <a className="large">Easy Login</a>
      }>

      <NavItem className=" social github center-align"><a className="waves-effect  social github center-align" href="/auth/github">Github</a></NavItem>
      <NavItem divider />
      <NavItem className=" social google center-align"><a className="waves-effect  social google center-align" icon="fa facebook" href="/auth/google">Google</a></NavItem>
      <NavItem divider />
      <NavItem className=" social facebook center-align"><a className="waves-effect social facebook center-align" href="/auth/facebook">Facebook</a></NavItem>
    </Dropdown>



  </li>
          );
      case  null:
          return;
      default :
      console.log(this.props.auth);
          return([
            <li><SideNavMenu user={this.props.auth.user} className="btn-large"/></li>,
            <li key="1"><Payment /></li>,
            <li key="3" style={{margin : '0px 10px'}}> Credits: { this.props.auth.user.credits} </li>,
            <li key="2">
              <a href="/api/logout"> Sign out </a>
            </li>
          ]

          );
    }
  }


  render () {
    return (
    <div className="valign-wrapper">

      <nav>
        <div className="nav-wrapper">
          <Link to= {this.props.auth ? '/surveys' : '/' }
            className="brand-logo">MailChump</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down valign-wrapper">
              { this.rendercontent() }
          </ul>
        </div>
      </nav>
      </div>
    )
  }
}
function mapStateToProps({auth}){ // mapStateToProps({auth}) es6 syntax // state.auth
  return { auth : auth };
}

export default connect(mapStateToProps)(Header);
