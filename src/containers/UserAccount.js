import React, { Component } from 'react';
import PaymentContainer from './PaymentContainer'
import Moment from 'react-moment';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Grid, Segment, Header, Image, Card, Icon, Button, Divider, Radio, Form, Modal, Progress } from 'semantic-ui-react';

let currentDate = new Date().toISOString().slice(0, 10);

class UserAccount extends Component {
  state = {
    tripsArr: []
  }

  handlesubscribe = (event) => {
    console.log("Which one was clicked", this.props.currentUser);
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        subscription_id: null
      })
    })
    .then(res => res.json())
    .then(data => this.props.setCurrentUser(data))
  }

  componentDidMount= () => {
    fetch('http://localhost:3000/trips')
      .then(res => res.json())
      .then(trips => this.setState({
        tripsArr: trips
      }) )
  }

  handleDelete = (deletingTrip) => {
    fetch(`http://localhost:3000/trips/${deletingTrip.id}`, {
    method: 'Delete',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
      }
    })
    this.props.deleteDestinationFromUser(deletingTrip)
  }

  giveMeAMoment = (timeframe) => {
    const a = moment(timeframe.split(" - ")[0])
    const b = moment(Date.now())
    return moment.duration(a - b).format("DD")
  }

  render() {
    console.log(this.props.currentUser);
    // const { first_name, last_name, email, username } = this.props
    // console.log(this.state.tripsArr);

    return (

    <Grid columns={2} stackable className="fill-content">
      <Grid.Row>
        <Grid.Column width={1} />
        <Grid.Column width={7}>
          <Segment>
            <Header as="h1">Profile</Header>
            <Image className="centered" src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' size="small" circular />
            <Card fluid>
              <Card.Content>
                <Card.Header>{this.props.currentUser && this.props.currentUser.username}</Card.Header>
                <Card.Meta>Joined in 2019</Card.Meta>
                <Card.Description>{this.props.currentUser && this.props.currentUser.first_name} {this.props.currentUser &&  this.props.currentUser.last_name}</Card.Description>
                <Card.Description>{this.props.currentUser && this.props.currentUser.email}</Card.Description>

                <br />
                <Button>Payment Method</Button>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="plane" />
                  10 Trips Accomplished
                </a>
              </Card.Content>
            </Card>
          </Segment>
        </Grid.Column>
        <Grid.Column width={7}>
          <Segment>
            <Header as="h2">Dashboard</Header>

            {

            this.props.currentUser && this.props.currentUser.subscription === null ?
            <div>
              <p>Currenty not Subscribed</p>
              <Link to="/pricing">
              <Button>Check Prices</Button>
              </Link>
            </div>

            :

            <div>
              <h4>Subscription Type: {this.props.currentUser && this.props.currentUser.subscription.sub_type}</h4>
              <Button onClick={this.handlesubscribe} negative>Unsubscribe</Button>
            </div>

          }
            <Divider />

          <Header as="h2">Current Trips</Header>
            <Grid columns={1} divided>
      <Grid.Row>
        <Grid.Column>

          {
            this.props.currentUser !== null ?
            this.props.currentUser.trips.map(trip => {
              return <div>
              <h3>{trip.destination.location}</h3>
              <Image src={trip.destination.image} />
              <b><Icon name="time" size="small"/>{trip.destination.timeframe}</b>
                <Progress progress='value' value={this.giveMeAMoment(trip.destination.timeframe) } total={90} color='yellow' active>
                  Days Until Your Trip
                </Progress>
              <Button onClick={()=> this.handleDelete(trip)} secondary>Cancel Trip</Button>
              </div>
            })
            :
            null
          }

        </Grid.Column>
      </Grid.Row>
       </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid.Row>
    </Grid>

    );
  }
}

function mapStateToProps(state){

  return {
    chooseSubscription: state.chooseSubscription,
    currentUser: state.currentUser,
    destinations: state.destinations,
    bookedDestination: state.bookedDestination
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser:(userObj) => {
      dispatch({ type: "SET_CURRENT_USER", payload: userObj})
    },
    setChosenSubscription:(subType) => {
      dispatch({ type: "CHOOSE_SUBSCRIPTION_TYPE", payload: subType})
    },
    deleteDestinationFromUser:(trip) => {
      dispatch({ type: "DELETE_DESTINATION_FROM_USER", payload: trip})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
