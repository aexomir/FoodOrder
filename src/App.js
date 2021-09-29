import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Context/CartProvider";

function App() {
  const [cartShown, setCartShown] = useState(false);

  const toggleCartHandler = () => {
    setCartShown((prevState) => {
      return !prevState;
    });
  };

  return (
    <CartProvider>
      <Cart onClose={toggleCartHandler} />
      <Header onToggleCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
