import React, {Component} from 'react';
import {Button, Icon, NavItem, Dropdown, SideNavItem, SideNav} from 'react-materialize';

class SideNavMenu extends Component {
  render(){
    return (
      <SideNav
          trigger={<a className="btn-floating pulse"><i className="material-icons">menu</i></a>
}
          options={{ closeOnClick: true }}

          >
          <SideNavItem userView
              user={{
              background: 'https://placeimg.com/640/480/tech' ,
              image: this.props.user.picture || 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2130688587246329&height=50&width=50&ext=1544206741&hash=AeTyXT9kS_kdKlkC',
              name: this.props.user.name || 'John Doe',
              email: 'jdandturk@gmail.com'
              }}
          />
        <SideNavItem href= {this.props.user.url || '#!icon'}  icon='cloud'>Links</SideNavItem>
          <SideNavItem href='#!second'>Profile</SideNavItem>
          <SideNavItem href='/api/logout'>Sign out</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Advanced</SideNavItem>
          <SideNavItem waves href='#!third'>Settings</SideNavItem>
      </SideNav>

    )
  }
}
export default SideNavMenu;
