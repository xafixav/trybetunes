import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { preview: previewUrl } = this.props;
    return (
      <div>
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
}

MusicCard.propTypes = {
  preview: PropTypes.string.isRequired,
};
