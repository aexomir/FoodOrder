import { useContext } from "react";
import CartContext from "../../../Context/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = ({ id, name, description, price }) => {
  const dollar_price = `$${price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{dollar_price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
