import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Component/Header';

class Search extends Component {
  render() {
    const {
      artistName,
      isButtonDisabled,
      onHandleChange,
      pesquisa,
    } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
          <label htmlFor="search-artist-input">
            Nome
            <input
              type="text"
              name="artistName"
              value={ artistName }
              onChange={ onHandleChange }
              placeholder="Insira o nome do artista"
              id="search-artist-input"
              data-testid="search-artist-input"
            />
          </label>
          <label htmlFor="search-artist-button">
            <input
              type="button"
              value="Pesquisar"
              id="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ pesquisa }
              data-testid="search-artist-button"
            />
          </label>
        </form>
      </div>
    );
  }
}

Search.defaultProps = {
  artistName: '',
  isButtonDisabled: true,
  pesquisa: '',
  onHandleChange: '',
  // listaArtistas: '',
};

Search.propTypes = {
  artistName: PropTypes.string,
  isButtonDisabled: PropTypes.func,
  pesquisa: PropTypes.func,
  onHandleChange: PropTypes.func,
  // listaArtistas: PropTypes.func,
};

export default Search;
