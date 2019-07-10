import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux'
import { Card, Segment, Icon, Comment, CommentGroup, Form, Button } from 'semantic-ui-react'

class CommentComponent extends Component {

  handleDelete = (event) => {
    console.log(this.props.comment.id)
    fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
      }
    })
    this.props.deleteCommentFromShowPage(this.props.comment)
  }

  render() {
    const { content, created_at, user } = this.props.comment
    return (

      <Card centered>
      <CommentGroup>
      <Comment>
        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>{user.username}</Comment.Author>
          <Comment.Metadata>
            <Moment format="YYYY-MM-DD HH:mm" >{created_at}</Moment>
          </Comment.Metadata>
          <Comment.Text as="h3">{content}</Comment.Text>
          <Comment.Actions>
          {
            this.props.currentUser && this.props.currentUser.id === this.props.comment.user.id ?
            <Button onClick={this.handleDelete} circular icon='delete' />
            :
            null
          }
          </Comment.Actions>
        </Comment.Content>
      </Comment>
      </CommentGroup>
      </Card>

    );
  }
}

function mapStateToProps(state){

  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCommentFromShowPage:(deleteComment) => {
      dispatch({ type: "DELETE_COMMENT_FROM_SHOW_PAGE", payload: deleteComment})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
