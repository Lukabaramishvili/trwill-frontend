import React, { Component } from 'react';
import CommentComponent from './CommentComponent'
import PieChartContainer from './PieChartContainer'
import { connect } from 'react-redux'
import { Button, Header, Image, Grid, Card, Segment, Icon, Form } from 'semantic-ui-react';

class DestinationShowPage extends Component {

  state = {
    content: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleComment = (event) => {
    const destinationId = this.props.history.location.pathname.split("/")[2]
    event.preventDefault();
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        comment: {
          content: this.state.content,
          user_id: this.props.currentUser.id,
          destination_id: destinationId
        }
      })
    })
    .then(res => res.json())
    .then(comment => this.props.saveCommentToDestination(comment))
    this.setState({
      content: ""
    })
  }

  render() {
    const destinationShowId = parseInt(this.props.match.params.id)
    console.log(destinationShowId)

    if (this.props.destinations.length === 0) {
      return <h1>Loading...</h1>
    }

    let destinationOnlyShowPage = this.props.destinations.find(destination => {
      return destination.id === destinationShowId
    })

    const { location, image, description, comments, users, timeframe } = destinationOnlyShowPage
    return (

      <div>

      <Grid columns={2} stackable className="fill-content">
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={7}>
            <Segment>

              <Image className="centered" src={image} size="large"  />
              <Card fluid>
                <Card.Content>
                  <Card.Header>{location}</Card.Header>

                  <Card.Description as="h2">Next Trip</Card.Description>
                  <Card.Description as="h4">{timeframe}</Card.Description>
                </Card.Content>
                <Card.Content extra>

                    <Icon name="users" />
                    {
                      users.map(user => {
                        return <li>{user.username} Booked </li>
                      })
                    }

                </Card.Content>
              </Card>
            </Segment>
          </Grid.Column>
          <Grid.Column width={7}>
          <Segment>
          <Grid.Column textAlign="center">

            <h2>Your Next Trip to {location}</h2>
            <li><Icon name="plane" size="small"/> Round Airplane Ticket</li>
            <li><Icon name="hotel" size="small"/> 3* Hotel</li>
            <li><Icon name="time" size="small"/> 3 - 4 Days</li>
            <h3>{description}</h3>
          </Grid.Column>
          </Segment>
          </Grid.Column>
      </Grid.Row>
      </Grid>
         <PieChartContainer  />


          <Header as='h3'>
            Comments
          </Header>
          {
            this.props.currentUser ?
            <Form reply>
              <Grid centered>
                <Form.TextArea onChange={this.handleChange} name = "content" value={this.state.content}/>
              </Grid>
              <br />
              <Button onClick={this.handleComment} content='Comment' labelPosition='left' icon='edit' primary />
            </Form>
            :
            null
          }

          {
            comments.map(comment => {
              return <CommentComponent comment={comment} currentUser={this.props.currentUser}/>
            })
          }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    destinations: state.destinations

  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCommentToDestination:(comment) => {
      dispatch({ type: "SAVE_COMMENT_TO_DESTINATION", payload: comment})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationShowPage);
