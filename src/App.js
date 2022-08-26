import s from "./App.module.css";
import CurrencyRate from "./components/CurrencyRate";
import Convertor from "./components/Convertor";
import { fetchCurrencies } from "./api/fetchCurrency.js";
import { useEffect, useState } from "react";

function App() {
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    async function getCurrency() {
      try {
        setCurrency(await fetchCurrencies("USD, EUR", "UAH"));
      } catch (e) {
        console.log(e);
      }
    }
    getCurrency();
  }, []);

  return (
    <div className="App">
      <header className={s.container}>
        {currency && <CurrencyRate eur={currency.results.EUR} usd={currency.results.USD} />}
      </header>
      <Convertor />
    </div>
  );
}

export default App;
