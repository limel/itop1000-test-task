import s from "./CurrencyRow.module.scss";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

export default function CurrencyRow({ amount, onChangeAmount, onChangeOptions, currentCurrency }) {
  const [active, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handlerOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handlerOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handlerOutsideClick);
    };
  }, [active]);

  return (
    <div className={s.wrapper} ref={ref}>
      <label className={s.input}>
        <span>{currentCurrency ?? "."}</span>
        <input type="number" className={s.input} value={amount} onChange={onChangeAmount} />
      </label>

      <div className={active ? `${s.dropdown} ${s.dropdown_active}` : `${s.dropdown}`}>
        <div className={s.dropdown__current} onClick={() => setActive(true)}>
          <span> {currentCurrency ?? "Виберіть валюту зі списку"}</span>
          <svg>
            <use href="/sprite.svg#arrow"></use>
          </svg>
        </div>

        <ul className={s.options} onClick={() => setActive(false)}>
          <li className={s.options__item} onClick={(e) => onChangeOptions(e.target.textContent)}>
            USD
          </li>
          <li className={s.options__item} onClick={(e) => onChangeOptions(e.target.textContent)}>
            EUR
          </li>
          <li className={s.options__item} onClick={(e) => onChangeOptions(e.target.textContent)}>
            UAH
          </li>
        </ul>
      </div>
    </div>
  );
}

CurrencyRow.propTypes = {
  currentCurrency: PropTypes.string,
  amount: PropTypes.node,
  onChangeAmount: PropTypes.func.isRequired,
  onChangeOptions: PropTypes.func.isRequired,
};
