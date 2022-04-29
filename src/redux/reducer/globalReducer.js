const initialState = {
  isLoading: false,
};

const globalState = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };

    default:
      return state;
  }
};

export default globalState
