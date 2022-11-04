import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Component/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Component/MusicCard';

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
          i === 0 ? (
            <>
              <img src={ musica.artworkUrl100 } alt={ musica.collectionCensoredName } />
              <br />
              <spam key={ musica.artistName } data-testid="artist-name">
                { musica.artistName }
              </spam>
              <br />
              <spam key={ musica.collectionName } data-testid="album-name">
                { musica.collectionName }
              </spam>
            </>)
            : (
              <MusicCard
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
              />
            )
          // MusicCard { musica.nomedamusica } { musica URL }
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
