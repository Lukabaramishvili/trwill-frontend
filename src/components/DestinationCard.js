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
          <Button>See More</Button>
          </Link>
          <Modal trigger={<Button>See Details</Button>}>
          <Modal.Header>{location}</Modal.Header>
          <Modal.Content image>
            <Image size='medium' src={image} />
            <Modal.Description>
              <Header>Details</Header>
              <Divider />
              <p>{description}</p>
              <Divider />
              <p>Traveling Period: {timeframe}</p>
              <br />
              <Header>Users Traveling in this location</Header>
              {
                this.props.destination.users.map(user => {
                  return <div>
                    <li>User - {user.username} </li>
                  </div>
                })
              }
            </Modal.Description>
          </Modal.Content>
        </Modal>
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
          : ( this.props.currentUser.trips.length >= 2
            ?
            "You've already booked more than two trips"
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
