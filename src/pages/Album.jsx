import React, { Component } from 'react';
import Header from '../Component/Header';

class Album extends Component {
  componentDidMount() {
    const { match } = this.props
    console.log(match.params.id)
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Album</h2>
      </div>
    );
  }
}

export default Album;
