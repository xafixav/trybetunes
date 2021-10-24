import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      artistName: '',
      artistInfo: [],
      isLoading: false,
      searchDone: false,
    };
  }

  searchArtist = (event) => {
    const text = event.target.value;
    this.setState({ artist: text });
    this.setState({ artistName: text });
  }

  setArtist = async () => {
    const { artist } = this.state;
    this.setState({ isLoading: true });
    const infoArtist = await searchAlbumsAPI(artist);
    this.setState({ isLoading: false });
    this.setState({ artistInfo: infoArtist });
    this.setState({ searchDone: true });
    this.setState({ artist: '' });
  }

  renderArtist = () => {
    const { artistInfo } = this.state;
    const MIN = 0;
    const result = artistInfo.map((element) => {
      const { collectionId, artistName, collectionName } = element;
      return (
        <div key={ collectionId }>
          <span>
            Album Name:
            <p>
              {collectionName}
            </p>
          </span>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
            state={ { Aname: artistName, CName: collectionName } }
          >
            {artistName}
          </Link>
        </div>
      );
    });
    const resultError = (<p>Nenhum álbum foi encontrado</p>);
    return (result.length > MIN ? result : resultError);
  }

  authorizeButton = () => {
    const { artist } = this.state;
    const MIN = 1;
    const characterNumber = artist.length;
    const resultTrue = (
      <button
        type="button"
        data-testid="search-artist-button"
        onClick={ () => { this.setArtist(); } }
      >
        Procurar
      </button>
    );
    const resultFalse = (
      <button
        type="button"
        data-testid="search-artist-button"
        disabled
      >
        Procurar
      </button>
    );
    return (characterNumber > MIN ? resultTrue : resultFalse);
  }

  searchComplete = () => {
    const { artistName } = this.state;
    return (
      <p>{`Resultado de álbuns de: ${artistName}`}</p>
    );
  }

  render() {
    const { isLoading, searchDone, artistInfo, artist } = this.state;
    return (
      <section>
        <div data-testid="page-search">
          <input
            type="text"
            placeholder="Type your Artist"
            data-testid="search-artist-input"
            value={ artist }
            onChange={ this.searchArtist }
          />
          {this.authorizeButton()}
        </div>

        <div>
          {searchDone && artistInfo.length > 0 && this.searchComplete() }
          {isLoading && <Loading />}
          {searchDone && this.renderArtist()}
        </div>
      </section>

    );
  }
}
