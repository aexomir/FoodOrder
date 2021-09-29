import styles from "./Header.module.css";
import mealsImage from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onToggleCart }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onToggleCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt={"A table full of food"} />
      </div>
    </>
  );
};

export default Header;
