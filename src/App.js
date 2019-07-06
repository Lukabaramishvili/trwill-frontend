import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Navbar from './components/Navbar'
import UserAccount from './containers/UserAccount'
import DestinationContainer from './components/DestinationContainer'
import PricingComponent from './components/PricingComponent'
import DestinationShowPage from './components/DestinationShowPage'
import HowItWorks from './components/HowItWorks'
import { connect } from 'react-redux';


class App extends Component {

	componentDidMount(){
		const token = localStorage.getItem("token")
		if(token){
			// get user data
			fetch("http://localhost:3000/auto_login", {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(res => res.json())
			.then(response => {
				// debugger
				if (response.errors){
					localStorage.removeItem("user_id")
					alert(response.errors)
				} else {
					this.props.setCurrentUser(response)
				}
			})
		}
	}

  render() {
    // console.log(this.props.currentUser);
    return (
      <Grid>
				<Navbar logOut={this.props.logOut} />
				<Grid.Row centered>
					<Switch>
            <Route path="/users/:id" component={UserAccount} />
            <Route path="/destinations" component={DestinationContainer} />
            <Route path="/pricing" component={PricingComponent} />
            <Route path="/show" component={DestinationShowPage} />
            <Route path="/how" component={HowItWorks} />
						<Route path="/login" render={(routerProps) => {
							return <LoginForm {...routerProps}/>
						}} />
						<Route path="/signup" render={(routerProps) => {
							return <SignupForm setCurrentUser={this.props.setCurrentUser} {...routerProps}/>
						}} />
					</Switch>
				</Grid.Row>
			</Grid>
    );
  }
}

//Reading to state
function mapStateToProps(state){

  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser:(userObj) => {
      dispatch({ type: "SET_CURRENT_USER", payload: userObj})
    },
    logOut:() => {
      localStorage.clear();
      dispatch({type: 'LOG_OUT'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
