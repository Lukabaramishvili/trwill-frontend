import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';

class HowItWorks extends Component {

  render() {
    return (
      <>
      <div class="ui vertical stripe segment">
    <div class="ui middle aligned stackable grid container">
      <div class="row">
        <div class="eight wide column">
          <h3 class="ui header"> 1. Choose Travel Type</h3>
          <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
          <h3 class="ui header">We Make Bananas That Can Dance</h3>
          <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
        </div>
        <div class="six wide right floated column">
          <img src="https://images.unsplash.com/photo-1445964047600-cdbdb873673d?ixlib=rb-0.3.5&q=80&fm=jpg&w=1080&fit=max&s=4095108ad20979bc2f6522caa3c9eaab" class="ui large bordered rounded image" />
        </div>
      </div>
      <div class="row">
        <div class="center aligned column">
          <a class="ui huge button">Check Them Out</a>
        </div>
      </div>
    </div>
  </div>
  </>
    );
  }
}

export default HowItWorks;
