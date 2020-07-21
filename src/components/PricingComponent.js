import React, { Component } from 'react';

import { connect } from 'react-redux';

const baseURL = 'https://trawill-backend.herokuapp.com';

class PricingComponent extends Component {

  handleClickSolo = (event) => {
    // run fetch to subscribe user
    if (this.props.currentUser === null){
      alert("Please Sign in to Subscribe")
    }else if (this.props.currentUser.subscription && this.props.currentUser.subscription.sub_type === "solo") {
      alert("You are already subscribed to this plan.")
    } else {
      fetch(`${baseURL}/users/${this.props.currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          subscription_id: 1
        })
      })
      .then(res => res.json())
      .then(data => {
        this.props.setCurrentUser(data)
        alert("You are now subscribed!")
      })
    }
  }

  handleClickGroup = (event) => {
    // run fetch to subscribe user
    if (this.props.currentUser === null){
      alert("Please Sign in to Subscribe")
    }else if (this.props.currentUser.subscription && this.props.currentUser.subscription.sub_type === "group") {
      alert("You are already subscribed to this plan.")
    } else {
      fetch(`${baseURL}/users/${this.props.currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          subscription_id: 2
        })
      })
      .then(res => res.json())
      .then(data => {
        this.props.setCurrentUser(data)
        alert("You are now subscribed!")
      })
    }
  }

  render() {
    // console.log(this.props.chooseSubscription[0]);
    // console.log(this.props.currentUser);
    return (
      <div className="ui price-image fluid container">
      <div className='ui container'>
   <div className="ui grid">
      <div className="five wide column">
         <div className="ui raised segments">
            <div className="ui center aligned secondary segment">
               <div className="ui statistic">
               <span className="ui header">Group Subscription</span>
                  <div className="value">
                     $100
                  </div>
                  <div className="label">
                     per month
                  </div>
               </div>
            </div>
            <div className="ui center aligned segment">
               <p> 3 Trips/Year </p>
            </div>
            <div className="ui center aligned segment">
               <p>Air Plain Fair - Round Trip </p>
            </div>
            <div className="ui center aligned segment">
               <p>Hotel 3* </p>
            </div>
            <div className="ui center aligned segment">
               <p>Travel Duration - 3 - 4 Days </p>
            </div>
         </div>
         <div onClick={this.handleClickGroup} className="ui green fluid button">
          Subscribe
        </div>

      </div>
      <div className="five wide column">
         <div className="ui raised segments">
            <div className="ui center aligned secondary segment">
               <div className="ui statistic">
               <span className="ui header">Solo Subscription</span>
                  <div className="value">
                     $50
                  </div>
                  <div className="label">
                     per month
                  </div>
               </div>
            </div>
            <div className="ui center aligned segment">
               <p> 3 Trips/Year </p>
            </div>
           <div className="ui center aligned segment">
               <p> Air Plain Fair - Round Trip </p>
            </div>
           <div className="ui center aligned segment">
               <p> Hotel 3* </p>
            </div>
           <div className="ui center aligned segment">
               <p> Travel Duration - 3 - 4 Days  </p>
            </div>
         </div>

        <div onClick={this.handleClickSolo} className="ui green fluid button">
          Subscribe
        </div>
      </div>
   </div>
   </div>

</div>
    );
  }
}

function mapStateToProps(state){

  return {
    chooseSubscription: state.chooseSubscription,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser:(userObj) => {
      dispatch({ type: "SET_CURRENT_USER", payload: userObj})
    },
    setChosenSubscription:(subType) => {
      dispatch({ type: "CHOOSE_SUBSCRIPTION_TYPE", payload: subType})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingComponent);
