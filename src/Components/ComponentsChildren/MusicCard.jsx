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
    };
  }

  async componentDidMount() {
    this.getSavedMusics();
  }

  getSavedMusics = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteList: favorites });
  }

  generateMusicCard = () => {
    const { preview: previewUrl } = this.props;
    const { trackId: track } = this.props;
    const { favoriteList } = this.state;
    const isThisFavorite = favoriteList.some((element) => Number(element) === track);
    return (
      <div>
        <label htmlFor="Favorita">
          Favorita
          <input
            type="checkbox"
            name="Favorita"
            data-testid={ `checkbox-music-${track}` }
            id={ track }
            onClick={ this.favoriteSong }
            checked={ isThisFavorite }
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
     const { id } = event.target;
     this.setState({ isLoading: true });
     await addSong(id);
     this.setState({ isLoading: false });
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
};
