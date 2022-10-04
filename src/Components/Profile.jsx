import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.MountProfile();
  }

  MountProfile = async () => {
    this.setState({ isLoading: true });
    const usuario = await getUser();
    this.setState({ user: usuario, isLoading: false });
  }

  renderProfile = () => {
    const { user } = this.state;
    return (
      <div>
        <p>{user.name}</p>
        <br />
        <h1>Email:</h1>
        <p>{user.email}</p>
        <br />
        <h1>Descrição:</h1>
        <p>{user.description}</p>
        <br />
        <img src={ user.image } alt={ user.name } data-testid="profile-image" />
        <br />
        <Link to="/profile/edit"><span>Editar perfil</span></Link>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (

      <div data-testid="page-profile">
        {isLoading && <Loading />}
        {this.renderProfile()}
      </div>

    );
  }
}
