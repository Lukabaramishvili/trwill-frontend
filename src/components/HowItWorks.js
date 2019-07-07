import React, { Component, Fragment } from 'react';
import { Icon, Grid, Image, Segment } from 'semantic-ui-react';

class HowItWorks extends Component {

  render() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <Segment>
      <div class="ui vertical stripe segment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="eight wide column">
              <h3 class="ui header"> 1. Choose Your Subscription</h3>

              <h3 class="ui header">2. Select Trip Type</h3>
              <h3 class="ui header">3. Pick a Destination</h3>

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
      </Segment>
    </Grid>
    );
  }
}

export default HowItWorks;
