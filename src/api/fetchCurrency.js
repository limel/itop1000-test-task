import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.baseURL = "https://api.fastforex.io";

export const fetchCurrencies = async (towardsCurrency, baseCurrency) => {
  const URL = `/fetch-multi?from=${baseCurrency}&to=${towardsCurrency}&api_key=${process.env.REACT_APP_APIKEY}`;
  const response = await axios.get(URL);
  return response.data;
};

export const fetchCurrency = async (fromCurrency, toCurrency) => {
  const URL = `/fetch-one?from=${fromCurrency}&to=${toCurrency}&api_key=${process.env.REACT_APP_APIKEY}`;
  const response = await axios.get(URL);
  return response.data;
};

fetchCurrencies.propTypes = {
  towardsCurrency: PropTypes.arrayOf(PropTypes.string).isRequired,
  baseCurrency: PropTypes.string.isRequired,
};

fetchCurrency.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
};
