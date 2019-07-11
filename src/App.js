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
import HomePage from './components/HomePage'
import HowItWorks from './components/HowItWorks'
import { connect } from 'react-redux';


class App extends Component {

	state = {
		filter: ""
	}

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
		fetch('http://localhost:3000/destinations')
		.then(res => res.json())
		.then(destinations => {
			// console.log("Fetched destinations in DestinationContainer:", destinations);
			this.props.getDestinationsList(destinations)
		})
	}

		handleFilter = (newInputValue) => {
		this.setState({
			filter: newInputValue
		})
	}

		filterTheDestinations = () => {
				return this.props.destinations.filter(destination => {
				return destination.location.toLowerCase().includes(this.state.filter.toLowerCase())
			})
  	}

  render() {
		// console.log(this.filterTheDestinations());
    // console.log(this.props.currentUser);
    return (
      <Grid>
				<Navbar logOut={this.props.logOut} />
				<Grid.Row centered>
					<Switch>
            <Route path="/users/:id" component={UserAccount} />
            <Route path="/destinations" render={(routerProps) => (
								<div>
									<DestinationContainer filterTheDestinations={this.filterTheDestinations()} handleFilter={this.handleFilter} {...routerProps} />
								</div>
							)} />
            <Route path="/pricing" component={PricingComponent} />
            <Route path="/show/:id" component={DestinationShowPage} />
            <Route path="/(home|)/" component={HomePage} />
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
