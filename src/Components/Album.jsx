import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './ComponentsChildren/MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [],
      update: false,
      artist: '',
      artistAlbum: '',
    };
  }

  componentDidMount() {
    this.fetchMusic().then(() => this.setUpdate());
  }

setUpdate = () => {
  const { musicList } = this.state;
  console.log(musicList);
  const info = musicList[0];
  this.setState(
    { update: true, artist: info.artistName, artistAlbum: info.collectionName },
  );
}

AlbumInfo = () => {
  const { artist, artistAlbum } = this.state;
  const result = (
    <div>
      <span data-testid="artist-name">{artist}</span>
      <br />
      <span data-testid="album-name">{artistAlbum}</span>
    </div>
  );
  return result;
}

fetchMusic = async () => {
  const { match: { params: { id: value } } } = this.props;
  const musics = await getMusics(value);
  this.setState({ musicList: musics });
}

mapAll = () => {
  const { musicList } = this.state;
  const result = musicList.filter((element) => element.kind === 'song')
    .map((element, index) => {
      const { trackName, previewUrl } = element;
      return (
        <div key={ index }>
          <span>{trackName}</span>
          <MusicCard name={ trackName } preview={ previewUrl } />
        </div>
      );
    });
  return result;
}

render() {
  const { update } = this.state;
  return (

    <div data-testid="page-album">
      {update && this.AlbumInfo()}
      {update && this.mapAll()}
    </div>

  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
