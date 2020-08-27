import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import Spinner from '../common/Spinner';
import { Card, Segment, Grid, Input, Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

const DestinationContainer = ({destinations, history}) => {
  const enteredValue = {
    filterInput: ''
  }
  const [ searchValue, setSearchValue] = useState(enteredValue);

  const handleSearch = (e) => {
    setSearchValue({...searchValue, [e.target.name]: e.target.value});
  }

  const filterTheDestinations = destinations.filter(destination => {
    return destination.location.toLowerCase().includes(searchValue.filterInput.toLowerCase());
  })

    return (
      destinations.length === 0 ? <Spinner /> : (
      <Grid columns={2} stackable className="fill-content">
        <Container>
        <div className="search-form">
          <Form>
            <Form.Field>
              <label>Search Destinations</label>
              <Input onChange={handleSearch} fluid icon='search' name='filterInput' placeholder='Search...'  value={searchValue.filterInput} />
            </Form.Field>
          </Form>
        </div>
      <Segment>
        <br />
      <Card.Group itemsPerRow={3}>
      {
        filterTheDestinations.map(destination => {
          return <DestinationCard history={history} key={destination.id} destination={destination}/>
        })
      }
      </Card.Group>
      </Segment>
      </Container>
    </Grid>
    )
  );
}

function mapStateToProps(state){

  return {
    destinations: state.destinations
  }
}

export default connect(mapStateToProps)(DestinationContainer);
