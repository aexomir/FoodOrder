import { useContext } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Context/cart-context";
import CartItem from "./CartItem";

const DUMMY_CART = [
  {
    id: 1,
    name: "FishNChips",
    amount: 3,
    price: 24.99,
  },
];

const Cart = ({ onClose }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)} `;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={() => cartItemAddHandler(item)}
      onRemove={() => cartItemRemoveHandler(item.id)}
    />
  ));

  return (
    <Modal onClose={onClose}>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.action}>
        <button className={styles["button--alt"]} onClick={onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
