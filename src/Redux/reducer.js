let initialState = {
  currentUser: null,
  destinations: [],
  chooseSubscription: "",
  bookedDestination: {}
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {...state, currentUser: action.payload.user}
    case 'LOG_OUT':
      return {...state, currentUser: null}



    // Destination Types
    case 'GET_DESTINATION_ARR':
        return {...state, destinations: action.payload}



    // Subscription Types
    case 'CHOOSE_SUBSCRIPTION_TYPE':
      return {...state, chooseSubscription: action.payload}

    // Booked Destinations
    case 'SAVE_DESTINATION_TO_USER':
      return {...state, bookedDestination: action.payload}

    default:
    return state;
  }
}

export default reducer;
