const initState = {
    isAuthenticated: false,
    user: {}
  };
  
  export default function(state = initState, action) {
    switch (action.type) {
      case "SET_CURRENT_USER":
        return {
          ...state,
          isAuthenticated: action.payload ? true : false,
          user: action.payload ? action.payload : {}
        };
      default:
        return state;
    }
  }
  