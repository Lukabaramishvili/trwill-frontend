import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';

class HomePage extends Component {

  render() {
    return (
      <>
      <div className="pusher">
          <div className="ui fixed text ">
          </div>
          <div className="ui vertical segment center aligned">

          <div className = "background" >
          <div className="ui vertical stripe segment">
            <div className="ui text container">
              <h1 className="ui  header">
                 Welocme to Subscription Based Travel
              </h1>
              <h2>Travel multitle times per year for just $50 per month</h2>
              <Link to="/destinations" >
              <div className="ui huge primary button">See Destinations<i className="right arrow icon"></i></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row">
              <div className="column">
              <h1><Icon name="check" size="big"/></h1>
              <h3> CHOOSE YOUR SUBSCRIPTION</h3>
              <p>Low cost monthly payments makes travel affordable</p>
            </div>
              <div className="column">
              <h1><Icon name="pin" size="big"/></h1>
              <h3>PICK DESTINATION</h3>
              <p>Our destination packages include Hotel and round trip airplain tickets</p>
            </div>
              <div className="column">
              <h1><Icon name="plane" size="big"/></h1>
              <h3>TRAVEL</h3>
              <p>Book a trip every 4 month</p>
            </div>
            </div>
            </div>
          </div>
          <h1>hello</h1>
      <div className="ui vertical">
        <h4 className="ui horizontal header divider">
          <a href="#">Contacts</a>
        </h4>
          <div className="ui six doubling cards">
            <div className="card">
              <div className="image">
                <img src="/images/avatar/large/elliot.jpg"/>
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="/images/avatar/large/helen.jpg"/>
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="/images/avatar/large/jenny.jpg"/>
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="/images/avatar/large/veronika.jpg"/>
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="/images/avatar/large/stevie.jpg"/>
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="/images/avatar/large/steve.jpg"/>
              </div>
            </div>
          </div>
      </div>
    </div>
        </div>

    </>

    );
  }

}

export default HomePage;
