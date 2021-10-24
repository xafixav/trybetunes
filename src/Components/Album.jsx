import React, { Component } from 'react';

export default class Album extends Component {
  render() {
    return (

      <div data-testid="page-album">
        <p>ola mundo sou o Album</p>
        {console.log(this.props)}
      </div>

    );
  }
}
