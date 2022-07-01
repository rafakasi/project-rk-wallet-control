import { SAVE_CURRENCIES, SAVE_EXPENSE,
  REMOVE_EXPENSE, EDIT_EXPENSE, EDIT_SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return ({ ...state,
      currencies: action.payload });
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((ex) => ex.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDIT_SAVE_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.map(
        (ex) => (ex.id === state.idToEdit ? {
          id: state.idToEdit, ...action.payload, exchangeRates: ex.exchangeRates }
          : ex),
      ),
    };
  default:
    return state;
  }
};

export default wallet;
