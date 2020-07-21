import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

const baseURL = 'https://trawill-backend.herokuapp.com';

class SignupForm extends Component {

  state = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  passwordConfirmation: "",
}

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

createUser = () => {
  fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json",
    },
    body: JSON.stringify({
      user: this.state
    })
  })
  .then(res => res.json())
  .then((response) => {
    if (response.errors){
      alert(response.errors)
    } else {
      localStorage.setItem("token", response.jwt)
      this.props.setCurrentUser(response)
      this.props.history.push(`/users/${response.user.id}`)
    }
  })
}

handleSubmit = () => {
  if(this.state.password === this.state.passwordConfirmation){
    this.createUser()
  } else {
    alert("Passwords don't match!")
  }
}

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
  <Form.Field>
    <label>Username</label>
    <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
  </Form.Field>
  <Form.Field>
    <label>FIrst Name</label>
    <input onChange={this.handleChange} name="first_name" value={this.state.first_name} placeholder='First Name' />
  </Form.Field>
  <Form.Field>
    <label>Last Name</label>
    <input onChange={this.handleChange} name="last_name" value={this.state.last_name} placeholder='Last Name' />
  </Form.Field>
  <Form.Field>
    <label>Email</label>
    <input onChange={this.handleChange} name="email" value={this.state.email} placeholder='email' />
  </Form.Field>
  <Form.Field>
    <label>Password</label>
    <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
  </Form.Field>
  <Form.Field>
    <label>Password Confirmation</label>
    <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
  </Form.Field>
  <Button type='submit'>Submit</Button>
</Form>
    );
  }

}

export default SignupForm;
