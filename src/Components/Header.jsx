import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Login from './Login';
import Loading from './Loading';
import './CSS/Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      create: this.createUser,
    };
    // this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.loadingDone();
  }

  componentDidUpdate() {
    this.loadingDone();
  }

  loadingDone = async () => {
    const userObj = await getUser();
    this.setState({ user: userObj });
    this.setState({ isLoading: false });
  }

  logoff = async () => {
    localStorage.removeItem('user');
  }

  createUser() {
    console.log(this);
  }

  renderUserName = () => {
    const { user } = this.state;
    let that = (
      <header data-testid="header-component" className="header-container">
        <h1 data-testid="header-user-name">{`Be welcome ${user.name}`}</h1>
        <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
        <li><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></li>
        <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        <li>
          <button
            type="button"
            onClick={ () => { this.logoff(); } }
          >
            <Link to="/">Sair</Link>
          </button>
        </li>
      </header>
    );
    if (user.name === undefined) {
      that = <Login { ... this.state } />;
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
