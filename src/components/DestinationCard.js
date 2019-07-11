import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Icon, Image, Modal, Button, Header, Divider, Input, Grid, Segment, Form } from 'semantic-ui-react'

class DestinationCard extends Component {

  handleDestinationBuy = (event) => {
    fetch(`http://localhost:3000/destinations/${this.props.destination.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(booked => {
      // debugger
      this.props.saveDestinationToUser(booked)
    })
    this.props.history.push(`./users/${this.props.destination.id}`)
  }

  render() {
    // console.log(this.props.currentUser);
    // debugger
    const { id, image, location, description, price, timeframe} = this.props.destination
    return (

      <Card>
    <div className="image-wrapper">
    <Image src={image}/>
    </div>
    <Card.Content textAlign="center">
      <Card.Header>{location}</Card.Header>
      <Card.Meta>
        <br />
        <Link to={`show/${id}`}>
          <Button>See Details</Button>
          </Link>

        <br />
        <br />
        {
          !this.props.currentUser ?
          "Please log in to book a trip!"
          :
          !this.props.currentUser.subscription ?
          "Please subscribe to Book!"
          :
          this.props.currentUser.trips.find(trip => {
            return trip.destination.id === id

          }) ?
          "You've already booked this trip"
          : ( this.props.currentUser.trips.length >= 3
            ?
            "You've already booked more than three trips"
            :
            <Button onClick={this.handleDestinationBuy} positive>Book This trip</Button>
          )
        }
      </Card.Meta>
    </Card.Content>
  </Card>

    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    bookedDestination: state.bookedDestination
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser:(userObj) => {
      dispatch({ type: "SET_CURRENT_USER", payload: userObj})
    },
    saveDestinationToUser:(booked) => {
      dispatch({ type: "SAVE_DESTINATION_TO_USER", payload:booked})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationCard);
