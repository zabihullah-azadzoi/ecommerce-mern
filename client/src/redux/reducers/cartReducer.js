let initialState = [];

if (typeof window !== "undefined") {
  if (window.localStorage.getItem("ecommerce-cart")) {
    initialState = JSON.parse(localStorage.getItem("ecommerce-cart"));
  } else {
    initialState = [];
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
