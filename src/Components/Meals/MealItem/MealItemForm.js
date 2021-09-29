import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = ({ onAddToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmountNumber = +amountInputRef.current.value;

    const numberError =
      enteredAmountNumber.trim().length == 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5;

    if (numberError) {
      return setAmountIsValid(false);
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter a Valid Amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
