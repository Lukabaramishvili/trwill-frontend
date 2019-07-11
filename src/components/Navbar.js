import React, { Component, Fragment } from 'react';
import { Grid, Menu, Image, Input, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Navbar extends Component {

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Menu secondary>
          <Menu.Item as='a' header>
            <Link to="/home">
               <Image size='mini' src='../trawill-logo.png' style={{ marginRight: '1.5em' }} />
               TraWill
               </Link>
             </Menu.Item>
             <Link className="item" to="/home">
               Home
             </Link>
            <Link className="item" to="/how">
              How it Works
            </Link>
            <Link className="item" to="/destinations">
              Destinations
            </Link>
            <Link className="item" to="/pricing">
              Pricing
            </Link>
            {
              this.props.currentUser

              ?

              <Menu.Menu position="right">
                <Link className="item" to={`/users/${this.props.currentUser.id}`}>
                  My Account
                </Link>
                <Menu.Item onClick={this.props.logOut}>
                <Link to={'/login'}> Log out </Link>
                </Menu.Item>
              </Menu.Menu>

              :

              <Menu.Menu position="right">
                <Link className="item" to="/login">
                  Login
                </Link>
                <Link className="item" to="/signup">
                  Sign Up
                </Link>
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
