import s from "./Convertor.module.scss";
import { useState, useEffect } from "react";
import { fetchCurrency } from "../../api/fetchCurrency";
import CurrencyRow from "../CurrencyRow/CurrencyRow";

export default function Convertor() {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(1);
  const [active, setActive] = useState(false);

  let toAmount, fromAmount;
  if (active) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setActive(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setActive(false);
  }

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      async function getCurrency() {
        try {
          const rate = await fetchCurrency(fromCurrency, toCurrency);
          const keys = Object.keys(rate.result);
          setExchangeRate(rate.result[keys[0]]);
        } catch (e) {
          console.log(e);
        }
      }
      getCurrency();
    }

    return () => {};
  }, [fromCurrency, toCurrency]);

  return (
    <section className={s.container}>
      <CurrencyRow
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        onChangeOptions={setToCurrency}
        currentCurrency={toCurrency}
      />
      <CurrencyRow
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        onChangeOptions={setFromCurrency}
        currentCurrency={fromCurrency}
      />
    </section>
  );
}
