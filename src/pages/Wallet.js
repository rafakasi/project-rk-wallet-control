import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import { fetchCurrencies, fetchCotation, editExpense, editSaveExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacão',
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.saveUserExpense = this.saveUserExpense.bind(this);
  }

  componentDidMount() {
    const { propGetCurrencie } = this.props;
    propGetCurrencie();
  }

  componentDidUpdate() {
    editExpense();
  }

  saveUserExpense = () => {
    const { id } = this.state;
    const { propGetCotation } = this.props;
    propGetCotation(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: id + 1,
    });
  };

  editExpense = () => {
    const { idToEdit, expenses, editor } = this.props;
    if (editor) {
      const propEdit = expenses.find((expense) => expense.id === idToEdit);
      this.setState(propEdit);
    }
  }

  handleEdit = () => {
    const { propEditExpense } = this.props;
    const editState = this.state;
    propEditExpense(editState);
    this.setState({
      description: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacão',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <form>
            <label htmlFor="value">
              Gastos:
              <input
                id="value"
                name="value"
                className="value"
                type="number"
                value={ value }
                data-testid="value-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                id="description"
                className="description"
                value={ description }
                type="text"
                placeholder="Descreva seus gastos"
                name="description"
                data-testid="description-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select
                id="currency"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {
                  currencies.map((coin, index) => (
                    <option
                      key={ index }
                      value={ coin }
                    >
                      { coin }
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="method">
              Pagamento:
              <select
                id="method"
                name="method"
                data-testid="method-input"
                value={ method }
                onChange={ this.handleChange }
              >
                {
                  paymentMethod.map((meth, index) => (
                    <option
                      key={ index }
                      value={ meth }
                    >
                      { meth }
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="tag">
              Categoria:
              <select
                id="tag"
                name="tag"
                data-testid="tag-input"
                onChange={ this.handleChange }
                value={ tag }
              >
                {
                  categories.map((categorie, index) => (
                    <option
                      key={ index }
                      value={ categorie }
                    >
                      { categorie }
                    </option>
                  ))
                }
              </select>
            </label>
            {editor ? (
              <button type="button" onClick={ this.handleEdit }>
                Editar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.saveUserExpense }
              >
                Adicionar despesas
              </button>
            )}
          </form>
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  propEditExpense: (ex) => dispatch(editSaveExpense(ex)),
  propGetCurrencie: () => dispatch(fetchCurrencies()),
  propGetCotation: (state) => dispatch(fetchCotation(state)),
});

Wallet.propTypes = {
  propGetCurrencie: PropTypes.func.isRequired,
  propGetCotation: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  propEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
