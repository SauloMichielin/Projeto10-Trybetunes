import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

// https://ui.dev/react-router-handling-404-pages (Bruno Nabarrete t26)

// 1 - state
// 2 - função desabilitar botao
// 3 - função adicionar usuário
// 4 - loading

class App extends React.Component {
  state = {
    loginName: '',
    isButtonDisabled: true,
  };

  // habilitar campo para edição e validação do botão
  onHandleChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value }, () => {
      const {
        loginName,
      } = this.state;
      const textoMinimo = 3;
      const disableState = loginName.length < textoMinimo;
      this.setState({ isButtonDisabled: disableState });
    });
  };

  render() {
    const {
      loginName,
      isButtonDisabled,
    } = this.state;
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
            loginName={ loginName }
            isButtonDisabled={ isButtonDisabled }
            onHandleChange={ this.onHandleChange }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

// Iniciando peleja

export default App;
