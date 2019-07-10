import React, { Component, Fragment } from 'react';
import DestinationCard from './DestinationCard'
import { Card, Segment, Grid, Input, Divider, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class DestinationContainer extends Component {

  render() {
    return (

      <Grid columns={2} stackable className="fill-content">
      <Segment>
      <Card.Group itemsPerRow={3}>
      {
        this.props.destinations.map(destination => {
          return <DestinationCard history={this.props.history} destination={destination}/>
        })
      }
      </Card.Group>
      </Segment>
    </Grid>
    );
  }
}

function mapStateToProps(state){

  return {
    destinations: state.destinations
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getDestinationsList:(destinationArray) => {
//       dispatch({ type: "GET_DESTINATION_ARR", payload: destinationArray })
//     }
//   }
// }

export default connect(mapStateToProps)(DestinationContainer);
