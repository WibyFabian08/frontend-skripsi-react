const initialState = {
  activeUser: null,
};

const userState = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_USER":
      return {
        ...state,
        activeUser: action.value,
      };

    default:
      return state;
  }
};

export default userState;
