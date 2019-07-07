import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Image, Modal, Button, Header, Divider } from 'semantic-ui-react'

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
    const {image, location, description, price, timeframe} = this.props.destination
    return (
      <Card>
    <Image src={image} wrapped ui={true} />
    <Card.Content>
      <Card.Header>{location}</Card.Header>
      <Card.Meta>
        <br />
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
