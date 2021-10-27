import React, { Component } from 'react';
import MusicCard from './ComponentsChildren/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FavList: [],
      updatePage: this.changeLoading,
    };
  }

  componentDidMount() {
    this.getSavedMusics();
    this.renderFavoriteMusics();
  }

  getSavedMusics = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ FavList: favorites });
  }

  changeLoading = () => {
    this.getSavedMusics();
  }

  renderFavoriteMusics() {
    const { FavList, updatePage } = this.state;
    const favoritos = FavList.map((element, index, arr) => {
      const { trackName, previewUrl, trackId } = element;
      return (
        <div key={ index }>
          <span>{trackName}</span>
          <MusicCard
            name={ trackName }
            preview={ previewUrl }
            trackId={ trackId }
            all={ arr }
            update={ updatePage }
          />
        </div>
      );
    });
    return (favoritos);
  }

  render() {
    return (
      <div data-testid="page-favorites">
        {this.renderFavoriteMusics()}
      </div>
    );
  }
}
