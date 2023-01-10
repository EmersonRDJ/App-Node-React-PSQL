function responseReducer(state, action) {
    switch (action.type) {
      case 'SET_RESPONSE':
        return {
          ...state,
          response: action.payload
        };
      default:
        return state;
    }
}