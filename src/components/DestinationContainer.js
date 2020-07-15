import React, { Component } from 'react';
import DestinationCard from './DestinationCard';
import { Card, Segment, Grid, Input, Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

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
        <Container>
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
          return <DestinationCard history={this.props.history} key={destination.id} destination={destination}/>
        })
      }
      </Card.Group>
      </Segment>
      </Container>
    </Grid>
    );
  }
}

function mapStateToProps(state){

  return {
    destinations: state.destinations
  }
}

export default connect(mapStateToProps)(DestinationContainer);
