import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const { dispatch } = this.props;

    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validEmail = () => {
      const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      return regex.test(email);
    };

    const minimumPassword = 6;
    const disabledValid = validEmail() && password.length >= minimumPassword;

    return (
      <div>
        <div>
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="email"
            placeholder="Usuário"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="submit"
              name="submitButton"
              disabled={ !disabledValid }
              onClick={ () => { dispatch(saveEmail(email)); } }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  propLogEmail: state.email,
});

export default connect(mapStateToProps)(Login);
