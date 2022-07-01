import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../actions';

class Table extends Component {
  render() {
    const { propExpenses, propRemoveExpense, propEditExpense } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </tbody>
          <tbody>
            {propExpenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{(expense.exchangeRates[expense.currency].name).split('/')[0]}</td>
                {/* Método split: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split */}
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                <td>
                  {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => propEditExpense(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => propRemoveExpense(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  propExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  propRemoveExpense: (ex) => dispatch(removeExpense(ex)),
  propEditExpense: (ex) => dispatch(editExpense(ex)),
});

Table.propTypes = {
  propExpenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  propRemoveExpense: PropTypes.func.isRequired,
  propEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
