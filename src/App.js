import React, { Component } from 'react';
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
import HomePage from './components/HomePage'
import HowItWorks from './components/HowItWorks'
import Spinner from './common/Spinner';
import { connect } from 'react-redux';

const baseURL = 'https://trawill-backend.herokuapp.com';

class App extends Component {

	componentDidMount(){
		const token = localStorage.getItem("token")
		if(token){
			// get user data
			fetch(`${baseURL}/auto_login`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.errors){
					localStorage.removeItem("user_id")
					alert(response.errors)
				} else {
					this.props.setCurrentUser(response)
				}
			})
		}
		fetch(`${baseURL}/destinations`)
		.then(res => res.json())
		.then(destinations => {
			this.props.getDestinationsList(destinations)
		})
	}

  render() {
	if (this.props.destinations.length === 0) {
		return <Spinner />
	}
    return (
    <Grid>
	<Navbar logOut={this.props.logOut} />
	<Grid.Row centered>
	<Switch>
        <Route path="/users/:id" component={UserAccount} />
        <Route path="/destinations" component={DestinationContainer} />
        <Route path="/pricing" component={PricingComponent} />
        <Route path="/show/:id" component={DestinationShowPage} />
        <Route path="/" exact component={HomePage} />
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

function mapStateToProps(state){

  return {
    currentUser: state.currentUser,
		destinations: state.destinations
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
    },
		getDestinationsList:(destinationArray) => {
		  dispatch({ type: "GET_DESTINATION_ARR", payload: destinationArray })
  	}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
