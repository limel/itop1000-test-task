import s from "./CurrencyRate.module.scss";

export default function CurrencyRate({ usd, eur }) {
  return (
    <ul className={s.wrapper}>
      <li className={s.item}>USD = {(1 / usd).toFixed(2)}</li>
      <li className={s.item}>EUR = {(1 / eur).toFixed(2)}</li>
    </ul>
  );
}
