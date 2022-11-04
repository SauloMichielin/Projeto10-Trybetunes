import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const {
      loginName,
      isButtonDisabled,
      SaveUser,
      onHandleChange,
    } = this.props;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="login-name-input">
            Nome
            <input
              type="text"
              name="loginName"
              value={ loginName }
              onChange={ onHandleChange }
              placeholder="Insira seu nome"
              id="login-name-input"
              data-testid="login-name-input"
            />
          </label>
          <label htmlFor="login-submit-button">
            <input
              type="button"
              value="Entrar"
              id="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ SaveUser }
              data-testid="login-submit-button"
            />
          </label>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string,
  isButtonDisabled: PropTypes.func,
  SaveUser: PropTypes.func,
  onHandleChange: PropTypes.func,
}.isRequired;

export default Login;
