export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_SAVE_EXPENSE = 'EDIT_SAVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editSaveExpense = (payload) => ({
  type: EDIT_SAVE_EXPENSE,
  payload,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIE',
});

const requestCotation = () => ({
  type: 'REQUEST_COTATION',
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    const currencies = Object.keys(results).filter((coin) => coin !== 'USDT');
    dispatch(saveCurrencies(currencies));
  };
}

export function fetchCotation(payload) {
  return async (dispatch) => {
    dispatch(requestCotation());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    payload.exchangeRates = { ...results };
    dispatch(saveExpense(payload));
  };
}

// export function fetchCurrencies() {
//   const api = 'https://economia.awesomeapi.com.br/json/all';
//   return async (dispatch) => {
//     dispatch(requestCurrencies());
//     const results = await fetch(api);
//     console.log(results);
//     const currencie = await results.json();
//     console.log(currencie);
//     return dispatch(saveCurrencies(currencie));
//   };
// }

// export const fetchCurrencies = () => async (dispatch) => {
//   dispatch(requestCurrencies());
//   return fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((currencie) => dispatch(saveCurrencies(currencie)));
// };
