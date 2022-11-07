import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    LoadingStatus: false,
    musicasFavoritas: [],
  };

  async componentDidMount() {
    this.setState({
      musicasFavoritas: await getFavoriteSongs(),
    });
  }

  Adicionar = () => {
    const { musicasFavoritas } = this.state;
    this.setState({
      LoadingStatus: true,
    }, async () => {
      await addSong({ ...this.props });
      this.setState({
        musicasFavoritas: [...musicasFavoritas, this.props],
        LoadingStatus: false,
      });
    });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const {
      musicasFavoritas,
      LoadingStatus,
    } = this.state;
    return (LoadingStatus === false
      ? (
        <div>
          <spam>{ trackName }</spam>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="musicasFavoritas">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name="musicasFavoritas"
              id="musicasFavoritas"
              onChange={ this.Adicionar }
              checked={ musicasFavoritas.some((musica) => musica.trackId === trackId) }
            />
          </label>
        </div>
      ) : <Loading />
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
