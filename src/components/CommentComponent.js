import React, { Component } from 'react';
import { Card, Segment, Icon, Comment, CommentGroup, Form } from 'semantic-ui-react'

class CommentComponent extends Component {

  render() {
    const { content, user } = this.props.comment
    return (
    <div>
      <Card style={{padding: "10px", margin: "10px"}}>
      <CommentGroup>
      <Comment>
        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>{user.username}</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>{content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
      </CommentGroup>
      </Card>
    </div>
    );
  }

}

export default CommentComponent;
