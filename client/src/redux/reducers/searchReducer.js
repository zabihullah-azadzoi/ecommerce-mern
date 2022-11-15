const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SEARCH_TEXT":
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
