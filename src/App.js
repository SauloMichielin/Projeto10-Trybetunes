import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './Component/Loading';

// https://ui.dev/react-router-handling-404-pages (Bruno Nabarrete t26)

// 1 - state
// 2 - função desabilitar botao
// 3 - função adicionar usuário
// 4 - loading

class App extends React.Component {
  state = {
    loginName: '',
    isButtonDisabled: true,
    LoadingStatus: false,
    redirect: false,
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

  SaveUser = async () => {
    const { loginName } = this.state;
    this.setState({
      LoadingStatus: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({
        LoadingStatus: false,
        redirect: true,
        loginName: '',
      });
    });
  };

  render() {
    const {
      loginName,
      isButtonDisabled,
      LoadingStatus,
      redirect,
    } = this.state;
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/">
            { LoadingStatus ? <Loading /> : <Login
              loginName={ loginName }
              isButtonDisabled={ isButtonDisabled }
              onHandleChange={ this.onHandleChange }
              SaveUser={ this.SaveUser }
            />}
            { redirect ? <Redirect to="/search" /> : ''}
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/album/:id">
            <Album />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/profile/edit">
            <ProfileEdit />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
