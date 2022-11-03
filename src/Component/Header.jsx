import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    LoadingStatus: false,
    loginName: '',
  };

  componentDidMount() {
    this.setState({
      LoadingStatus: true,
    }, async () => {
      const usuario = await getUser();
      this.setState({
        loginName: usuario.name,
        LoadingStatus: false,
      });
    });
  }

  render() {
    const { LoadingStatus, loginName } = this.state;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          { LoadingStatus ? <Loading /> : <p>{ loginName }</p> }
        </h1>
      </header>
    );
  }
}
