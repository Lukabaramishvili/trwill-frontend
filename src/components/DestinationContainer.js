import React, { Component, Fragment } from 'react';
import DestinationCard from './DestinationCard'
import { Card, Segment, Grid, Input, Divider, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class DestinationContainer extends Component {

  state = {
    filterInput: ""
  }

  handleSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleFilter(this.state.filterInput)

    this.setState({
      filterInput: ""
    })
  }


  render() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <div className="search-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Search Destinations</label>
              <Input onChange={this.handleSearch} action="search" name="filterInput" placeholder='Search...'  value={this.props.filterInput} />
            </Form.Field>
          </Form>
        </div>
      <Segment>
        <br />
      <Card.Group itemsPerRow={3}>
      {
        this.props.filterTheDestinations.map(destination => {
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
