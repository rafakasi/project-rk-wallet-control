import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { propLogEmail, propGastos } = this.props;
    return (
      <div>
        <h1> Carteira de Gastos </h1>
        <div>
          <p data-testid="email-field">{ propLogEmail }</p>
          <p data-testid="total-field">
            { propGastos.reduce((acc, cur) => {
              acc += cur.value * cur.exchangeRates[cur.currency].ask;
              return acc;
            }, 0).toFixed(2) }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>

    );
  }
}

Header.propTypes = {
  propLogEmail: PropTypes.string.isRequired,
  propGastos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  propLogEmail: state.user.email,
  propGastos: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
