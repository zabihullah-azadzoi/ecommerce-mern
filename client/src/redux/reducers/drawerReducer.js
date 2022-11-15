const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return action.payload;
    default:
      return state;
  }
};

export default drawerReducer;
