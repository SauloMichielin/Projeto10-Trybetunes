import React, { Component } from 'react';
import Header from '../Component/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musicas: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const idMusicas = match.params.id;
    const temp = await getMusics(idMusicas);
    this.setState({
      musicas: temp,
    });
  }

  render() {
    const {
      musicas,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Album</h2>
        { console.log(musicas[1]) }
        { musicas.map((musica, i) => (
          i === 0 && (
            <>
              <img src={ musica.artworkUrl100 } alt={ musica.collectionCensoredName } />
              <br />
              <spam key={ musica.artistName }>{ musica.artistName }</spam>
              <br />
              <spam key={ musica.collectionCensoredName }>
                { musica.collectionCensoredName }
              </spam>
            </>)
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
