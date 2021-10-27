import React, { Component } from 'react';
import MusicCard from './ComponentsChildren/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FavList: [],
      isLoading: false,
      updatePage: this.changeLoading,
    };
  }

  componentDidMount() {
    this.getSavedMusics();
    this.renderFavoriteMusics();
  }

  getSavedMusics = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ FavList: favorites, isLoading: false });
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
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        {isLoading && <Loading />}
        {this.renderFavoriteMusics()}
      </div>
    );
  }
}
