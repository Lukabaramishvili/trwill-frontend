import React, { Component } from 'react';
import PaymentContainer from './PaymentContainer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Grid, Segment, Header, Image, Card, Icon, Button, Divider, Radio, Form, Modal } from 'semantic-ui-react';


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


  render() {
    // const { first_name, last_name, email, username } = this.props
    // console.log(this.state.tripsArr);
    console.log(this.props.currentUser);
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
            <Header as="h2">Settings</Header>

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
              <p>Subscription Type: {this.props.currentUser && this.props.currentUser.subscription.sub_type}</p>
              <Button onClick={this.handlesubscribe} negative>Unsubscribe</Button>
            </div>

          }
            <Divider />
          </Segment>

          <Segment>
          <Header as="h4">Pause Subscription</Header>

          <Radio toggle />
          <Divider />
          <Header as="h4">Current Trips</Header>
            <Grid columns={1} divided>
      <Grid.Row>
        <Grid.Column>

          {
            this.props.currentUser !== null ?
            this.props.currentUser.trips.map(trip => {
              return <div>
              <p>{trip.destination.location}</p>
              <Image src={trip.destination.image} />
              <Button onClick={this.handleDelete} negative> delete trip</Button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
