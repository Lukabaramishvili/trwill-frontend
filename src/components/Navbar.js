import React, { Component } from 'react';
import { Grid, Menu, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


class Navbar extends Component {

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Menu stackable>
          <Menu.Item header>
            <NavLink exact to="/">
               <Image size='mini' src='../trawill-logo.png' style={{ marginRight: '1.5em' }} />
               TraWill
               </NavLink>
             </Menu.Item>
             <NavLink exact className="item" to="/">
               Home
             </NavLink>
            <NavLink className="item" to="/how">
              How it Works
            </NavLink>
            <NavLink className="item" to="/destinations">
              Destinations
            </NavLink>
            <NavLink className="item" to="/pricing">
              Pricing
            </NavLink>
            {
              this.props.currentUser

              ?

              <Menu.Menu position="right">
                <NavLink className="item" to={`/users/${this.props.currentUser.id}`}>
                  My Account
                </NavLink>
                <Menu.Item>
                <NavLink  onClick={this.props.logOut} to={'/login'}> Log out </NavLink>
                </Menu.Item>
              </Menu.Menu>

              :

              <Menu.Menu position="right">
                <NavLink className="item" to="/login">
                  Login
                </NavLink>
                <NavLink className="item" to="/signup">
                  Sign Up
                </NavLink>
              </Menu.Menu>

            }
          </Menu>
        </Grid.Column>
      </Grid.Row>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Navbar);
