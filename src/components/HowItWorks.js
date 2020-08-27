import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import PieChartContainer from './PieChartContainer';

const HowItWorks = ({destinations}) => {
    return (
    <>
      <div className="ui vertical stripe quote segment">
        <div className="ui equal width stackable internally celled grid">
          <div className="center aligned row">
            <div className="column box">
              <h1><Icon name="check" size="big"/></h1>
              <h3> CHOOSE YOUR SUBSCRIPTION</h3>
              <p>Low cost monthly payments makes travel affordable</p>
            </div>
            <div className="column box">
              <h1><Icon name="pin" size="big"/></h1>
              <h3>PICK DESTINATION</h3>
              <p>Our destination packages include Hotel and round trip airplain tickets</p>
            </div>
            <div className="column box">
              <h1><Icon name="plane" size="big"/></h1>
              <h3>TRAVEL</h3>
              <p>Book a trip every 4 month</p>
            </div>
          </div>
          </div>
        </div>
        <PieChartContainer destinations={destinations}/>
    </>
    );
}

function mapStateToProps(state){
  return {
    destinations: state.destinations,
  }
}

export default connect(mapStateToProps)(HowItWorks);
