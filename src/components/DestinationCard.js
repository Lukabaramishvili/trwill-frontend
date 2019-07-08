import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Icon, Image, Modal, Button, Header, Divider, Input, Grid, Segment } from 'semantic-ui-react'

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
    .then(booked => this.props.saveDestinationToUser(booked))
    this.props.history.push(`./users/${this.props.destination.id}`)
  }

  render() {
    // debugger
    const { id, image, location, description, price, timeframe} = this.props.destination
    return (

      <Card>
    <Image src={image} wrapped ui={true} />
    <Card.Content>
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
        <Button onClick={this.handleDestinationBuy} positive>Book This trip</Button>
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
