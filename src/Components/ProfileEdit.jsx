import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      Emmail: '',
      imageLink: '',
      descrip: '',
      isLoading: false,
      LoadReadirect: false,
    };
  }

  async componentDidMount() {
    this.setUserInState();
  }

  componentDidUpdate() {
    this.validationButton();
  }

  setUserInState = async () => {
    const usuario = await getUser();
    const { name, email, image, description } = usuario;
    this.setState({ user: name, Emmail: email, imageLink: image, descrip: description });
  }

  saveUserInfo = async () => {
    const { user, Emmail, imageLink, descrip } = this.state;
    const obj = {
      name: user,
      email: Emmail,
      image: imageLink,
      description: descrip,
    };
    console.log(obj);
    this.setState({ isLoading: true });
    await updateUser(obj);
    this.setState({ LoadReadirect: true });
  }

  validationButton = () => {
    const { user, Emmail, imageLink, descrip } = this.state;
    const result = [user, Emmail, imageLink, descrip];
    const bool = result.every((e) => e !== '');
    const button = (
      <button
        type="button"
        data-testid="edit-button-save"
        onClick={ this.saveUserInfo }
      >
        Salvar
      </button>
    );
    const buttonOff = (
      <button
        type="button"
        data-testid="edit-button-save"
        onClick={ this.saveUserInfo }
        disabled
      >
        <Link to="/profile">Editar perfil</Link>
      </button>
    );
    return bool ? button : buttonOff;
  }

  HandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderProfileEdit = () => {
    const info = 'user';
    return (
      <div>
        <input
          name={ info }
          type="text"
          onChange={ this.HandleChange }
          placeholder="username"
          data-testid="edit-input-name"
        />
        <input
          name="Emmail"
          type="email"
          onChange={ this.HandleChange }
          placeholder="Emmail"
          data-testid="edit-input-email"
        />
        <input
          name="imageLink"
          type="url"
          onChange={ this.HandleChange }
          placeholder="imageLink"
          data-testid="edit-input-image"
        />
        <textarea
          name="descrip"
          onChange={ this.HandleChange }
          placeholder="descrip"
          data-testid="edit-input-description"
        />
        {this.validationButton()}
      </div>
    );
  }

  render() {
    const { user, Emmail, imageLink, descrip } = this.state;
    const { isLoading, LoadReadirect } = this.state;
    return (

      <div data-testid="page-profile-edit">
        <p>ola mundo sou o ProfileEdit</p>
        {isLoading && <Loading />}
        <div>
          <input
            name="user"
            type="text"
            onChange={ this.HandleChange }
            placeholder="username"
            data-testid="edit-input-name"
            value={ user }
          />
          <input
            name="Emmail"
            type="email"
            onChange={ this.HandleChange }
            placeholder="Emmail"
            data-testid="edit-input-email"
            value={ Emmail }
          />
          <input
            name="imageLink"
            type="url"
            onChange={ this.HandleChange }
            placeholder="imageLink"
            data-testid="edit-input-image"
            value={ imageLink }
          />
          <textarea
            name="descrip"
            onChange={ this.HandleChange }
            placeholder="descrip"
            data-testid="edit-input-description"
            value={ descrip }
          />
          {this.validationButton()}
        </div>
        {LoadReadirect && <Redirect to="/profile" />}
      </div>

    );
  }
}
