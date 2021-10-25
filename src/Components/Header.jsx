import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.loadingDone();
  }

  loadingDone = async () => {
    const userObj = await getUser();
    this.setState({ user: userObj });
    this.setState({ isLoading: false });
  }

  renderUserName = () => {
    const { user } = this.state;
    let that = (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{`Be welcome ${user.name}`}</h1>
        <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
        <li><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></li>
        <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
      </header>
    );
    if (user.name === undefined) {
      that = '';
    }

    return that;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : this.renderUserName()}
      </div>
    );
  }
}