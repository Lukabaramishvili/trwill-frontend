import React, { Component, Fragment } from 'react';
import CommentComponent from './CommentComponent'
import { connect } from 'react-redux'
import { Button, Header, Image, Grid, Card, Segment, Icon, Comment, CommentGroup, Form } from 'semantic-ui-react'

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
  }

  // const mapDest = () => {
  //   this.props.destinations.map(destination => {
  //     return destination
  //   })
  // }
  // this.props.history.push(`./users/${this.props.destination.id}`)

  render() {
    // debugger
    // const destinationShowId = this.props.history.location.pathname.split("/")[2]
    const destinationShowId = parseInt(this.props.match.params.id)
    console.log(destinationShowId)

    if (this.props.destinations.length === 0) {
      return <h1>Loading...</h1>
    }

    let destinationOnlyShowPage = this.props.destinations.find(destination => {
      return destination.id === destinationShowId
    })

    const { location, image, description, comments } = destinationOnlyShowPage
    // console.log(destinationOnlyShowPage);
    return (

      <div>
      <Segment>
      <Grid columns={2} stackable className="fill-content">
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={7}>
            <Segment>
              <Header as="h1">{location}</Header>
              <Image className="centered" src={image} size="large"  />
              <Card fluid>
                <Card.Content>
                  <Card.Header>{location}</Card.Header>
                  <Card.Meta>Joined in 2019</Card.Meta>
                  <Card.Description>Desc</Card.Description>
                  <Card.Description>more descr</Card.Description>

                  <br />
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
        <Grid.Column>
            <Segment>
              <h3>{description}</h3>
            </Segment>
        </Grid.Column>
            </Grid.Row>
        </Grid>
        </Segment>



          <Header as='h3' dividing>
            Comments
          </Header>
          <Form reply>
            <Form.TextArea onChange={this.handleChange} name = "content"/>
            <Button onClick={this.handleComment} content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
          {
            comments.map(comment => {
              return <CommentComponent comment={comment}/>
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
