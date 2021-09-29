import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Context/cart-context";

const HeaderCartButton = ({ onClick }) => {
  const [buttonEffected, setButtonEffected] = useState(false);

  const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setButtonEffected(true);

    const buttonTimer = setTimeout(() => {
      setButtonEffected(false);
    }, 3000);

    return () => {
      clearTimeout(buttonTimer);
    };
  }, [cartCtx.items]);

  const numberOfCartItems = cartCtx.items.reudce((currNumber, item) => {
    return currNumber + item.amount;
  });

  const buttonStyles = `${styles.button} ${buttonEffected ? styles.bump : ""}`;

  return (
    <button className={buttonStyles} onClick={onClick}>
      <span style={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span style={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
