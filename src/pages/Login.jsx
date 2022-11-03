import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const {
      loginName,
      isButtonDisabled,
      createUser,
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
              onClick={ createUser }
              data-testid="login-submit-button"
            />
          </label>
        </form>
      </div>
    );
  }
}

Login.defaultProps = {
  loginName: '',
  isButtonDisabled: true,
  createUser: '',
  onHandleChange: '',
};

Login.propTypes = {
  loginName: PropTypes.string,
  isButtonDisabled: PropTypes.func,
  createUser: PropTypes.func,
  onHandleChange: PropTypes.func,
};

export default Login;
