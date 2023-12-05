export const initialState = {
  availableFoods: [],
  cartItems: [],
  subTotals: 0,
  addToCartMessage: false,
  inCartMessage: false,
  error: false,
  errorMessage: "",
};

export const ACTION = {
  GETINITIALSTATE: "INITIALSTATE",
  GETAVAILABLEFOOD: "GETAVAILABLEFOOD",
  GETCARTITEMS: "GETCARTITEMS",
  CLEARCART: "CLEARCART",
  UPDATECART: "UPDATECART",
  ADDFOODTOCART: "ADDFOODTOCART",
  DELETEITEMFROMCART: "DELETEITEMFROMCART",
  UPDATEFOODQUANTITY: "CALCULATEQUANTITY",
  SUBTOTALS: "SUBTOTALS",
  UPATESUBTOTALS: "UPDATESUBTOTALS",
  ERROR: "ERROR",
  REMOVEERRORMESSAGE: "REMOVEERRORMESSAGE",
};

export const reducer = (state, action) => {
  switch (action.type) {
    //cart
    case ACTION.GETAVAILABLEFOOD:
      return { ...state, availableFoods: action.payload };
    case ACTION.GETCARTITEMS:
      return {
        ...state,
        subTotals: action.subTotals,
        cartItems: action.payload.reverse(),
      };
    case ACTION.ADDFOODTOCART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ACTION.CLEARCART:
      return { ...state, cartItems: [] };
    case ACTION.UPDATECART:
      const updatedCart = [...state.cartItems, action.payload].reverse();
      return {
        ...state,
        subTotals: action.totals,
        cartItems: updatedCart,
      };
    case ACTION.DELETEITEMFROMCART:
      return { ...state, cartItems: action.cart, subTotals: action.totals };

    // subtotals
    case ACTION.SUBTOTALS:
      return { ...state, subTotals: action.payload };
    case ACTION.UPATESUBTOTALS:
      const findFood = state.cartItems.find(
        (item) => item.food.food_id === action.foodId
      );

      if (findFood) {
        const findIndexOffood = state.cartItems.indexOf(findFood);

        if (findIndexOffood !== -1) {
          const newCartItems = state.cartItems.slice();
          const { sub_total, food } = findFood;
          const { price } = food;
          const icreaseFoodSubTotals = sub_total + price;
          const decreaseFoodSubTotals = sub_total - price;
          const increaseQuantity = {
            ...findFood,
            quantity: findFood.quantity + 1,
            sub_total: icreaseFoodSubTotals,
          };
          const reduceQuantity = {
            ...findFood,
            quantity: findFood.quantity - 1,
            decreaseFoodSubTotals,
          };

          if (action.operation === "decrement") {
            newCartItems.splice(findIndexOffood, 1, reduceQuantity);
            return {
              ...state,
              subTotals: state.subTotals - action.payload,
              cartItems: newCartItems,
            };
          } else {
            newCartItems.splice(findIndexOffood, 1, increaseQuantity);
            return {
              ...state,
              subTotals: state.subTotals + action.payload,
              cartItems: newCartItems,
            };
          }
        }
        return state;
      }
      break;
    //error
    case ACTION.ERROR:
      return { ...state, error: true, errorMessage: action.message };
    case ACTION.REMOVEERRORMESSAGE:
      return { ...state, error: false };
    //defaults
    case ACTION.GETINITIALSTATE:
      return initialState;
    default:
      return state;
  }
};
