import React from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './Component/Loading';
import searchAlbumsAPI from './services/searchAlbumsAPI';

// https://ui.dev/react-router-handling-404-pages (Bruno Nabarrete t26)

class App extends React.Component {
  state = {
    loginName: '',
    artistName: '',
    isButtonDisabled: true,
    LoadingStatus: false,
    redirect: false,
    listaArtistas: [],
    nomeBusca: '',
  };

  // habilitar campo para edição e validação do botão
  onHandleChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value }, () => {
      const {
        loginName,
        artistName,
      } = this.state;
      const textoMinimo1 = 3;
      const textoMinimo2 = 2;
      const disableState = loginName.length >= textoMinimo1
        || artistName.length >= textoMinimo2;
      this.setState({ isButtonDisabled: !disableState });
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
        isButtonDisabled: true,
      });
    });
  };

  pesquisa = async (e) => {
    e.preventDefault();
    const { artistName } = this.state;
    this.setState({
      LoadingStatus: true,
    }, async () => {
      const results = await searchAlbumsAPI(artistName);
      this.setState({
        nomeBusca: artistName,
        listaArtistas: results,
        LoadingStatus: false,
        artistName: '',
        isButtonDisabled: true,
      });
    });
  };

  render() {
    const {
      loginName,
      artistName,
      isButtonDisabled,
      LoadingStatus,
      redirect,
      listaArtistas,
      nomeBusca,
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
            { LoadingStatus ? <Loading /> : <Search
              artistName={ artistName }
              isButtonDisabled={ isButtonDisabled }
              onHandleChange={ this.onHandleChange }
              pesquisa={ this.pesquisa }
              listaArtistas={ listaArtistas }
            />}
            { listaArtistas.length === 0
              && <h1>Nenhum álbum foi encontrado</h1> }
            { listaArtistas.length > 0
              && <h1>{ `Resultado de álbuns de: ${nomeBusca}` }</h1> }
            <ul>
              { LoadingStatus ? <Loading /> : (listaArtistas.map((Artista) => (
                <li key={ Artista.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${Artista.collectionId}` }
                    to={ `/album/${Artista.collectionId}` }
                  >
                    <img src={ Artista.artworkUrl100 } alt={ Artista.collectionName } />
                    { Artista.collectionName }
                    { Artista.artistName }
                  </Link>
                </li>)))}
            </ul>
          </Route>
          <Route exact path="/album/:id" component={ Album } />
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
