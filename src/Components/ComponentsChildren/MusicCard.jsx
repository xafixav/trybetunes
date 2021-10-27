import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favoriteList: [],
      checked: false,
    };
  }

  componentDidMount() {
    this.getSavedMusics();
  }

  updateIsFavorite = () => {
    const { trackId: track } = this.props;
    const { favoriteList } = this.state;
    const isThisFavorite = favoriteList
      .some((element) => Number(element.trackId) === track);
    this.setState({ checked: isThisFavorite });
    return isThisFavorite;
  }

  getSavedMusics = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteList: favorites }, this.updateIsFavorite);
  }

  generateMusicCard = () => {
    const { preview: previewUrl } = this.props;
    const { trackId: track } = this.props;
    const { all, name } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <label htmlFor="Favorita">
          Favorita
          <input
            type="checkbox"
            name={ name }
            data-testid={ `checkbox-music-${track}` }
            id={ all }
            onChange={ this.favoriteSong }
            checked={ checked }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
      </div>
    );
  }

   favoriteSong = async (event) => {
     const { name } = event.target;
     const { all } = this.props;
     const filtrado = all.find((element) => element.trackName === name);
     if (event.target.checked) {
       this.setState({ isLoading: true });
       await addSong(filtrado);
       this.setState({ isLoading: false, checked: true });
     } else {
       this.setState({ checked: false });
     }
   }

   render() {
     const { isLoading } = this.state;
     return (
       <div>
         {isLoading && <Loading />}
         {this.generateMusicCard()}
       </div>
     );
   }
}

MusicCard.propTypes = {
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  all: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
};
