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
      // debugger
      return {...state, currentUser: {...state.currentUser, trips: [...state.currentUser.trips, action.payload]}, bookedDestination: action.payload}

    case 'DELETE_DESTINATION_FROM_USER':
      const newTripsArr = state.currentUser.trips.filter(trip => {
        return trip.id !== action.payload.id
      })
      return {...state, currentUser: {...state.currentUser, trips: newTripsArr}}

    case 'DELETE_COMMENT_FROM_SHOW_PAGE':
      const deletedCommentInDestination = state.destinations.map(destination =>{
        if(destination.id === action.payload.destination_id){
          const newComments = destination.comments.filter(comment => comment.id !== action.payload.id)
          const newDestination = {...destination, comments: newComments}
          return newDestination
        }
        else{
          return destination
        }
      })
      return {...state, destinations: deletedCommentInDestination}

    case "SAVE_COMMENT_TO_DESTINATION":
        const newCommentInDestination = state.destinations.map(destination =>{
          if(destination.id === action.payload.destination_id){
            destination.comments = [action.payload, ...destination.comments]
            return destination
          }
          else{
            return destination
          }
        })
      return {...state, destinations: newCommentInDestination}

    default:
    return state;
  }
}

export default reducer;
