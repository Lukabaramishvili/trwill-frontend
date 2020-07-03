import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    console.log("LOGGING IN", this.state);
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
				"Accepts": "application/json"
      },
      body: JSON.stringify({
        user: this.state
      })
    })
    .then(res => res.json())
    .then(response => {
      // debugger
			if (response.errors) {
				alert(response.errors)
			} else {
				// response is the user object
				// console.log("This is the response", response)
				localStorage.setItem("token", response.jwt)
				this.props.setCurrentUser(response)
				this.props.history.push(`/users/${response.user.id}`)
			}
		})
  }

  render() {
    // console.log(this.state);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch({ type: "SET_CURRENT_USER", payload: userObj})
  },
})

export default connect(null, mapDispatchToProps)(LoginForm);
