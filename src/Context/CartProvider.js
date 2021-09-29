import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      let newItems;

      if (existingCartItem) {
        const newItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };

        newItems = [...state.items];
        newItems[existingCartItemIndex] = newItem;
      } else {
        newItems = state.items.concat(action.payload);
      }

      const newTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      return {
        items: newItems,
        totalAmount: newTotalAmount,
      };
    case "REMOVE_FROM_CART":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingCartItem = state.items[existingCartItemIndex];

      const newTotalAmount = state.totalAmount - existingCartItem.price;
      let newItems;

      if (existingCartItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const newItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        newItems = [...state.items];
        newItems[existingCartItemIndex] = newItem;
      }

      return {
        items: newItems,
        totalAmount: newTotalAmount,
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const CartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={CartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
