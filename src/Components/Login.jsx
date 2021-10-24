import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      criar: createUser,
      isLoading: false,
      hasLogged: false,
    };
    this.ON = this.ON.bind(this);
    this.OFF = this.OFF.bind(this);
  }

  autorizeButton = () => {
    const { usuario } = this.state;
    const MIN = 3;
    const BOOLEAN = usuario.length >= MIN;
    return BOOLEAN;
  }

  buttonFunc = async () => {
    const { usuario, criar } = this.state;
    this.setState({ isLoading: true });
    await criar({ name: usuario });
    this.setState({ hasLogged: true });
  }

  setName = (event) => {
    const { value } = event.target;
    this.setState({ usuario: value });
  }

  OFF() {
    return (
      <button
        type="button"
        data-testid="login-submit-button"
        onClick={ () => { this.buttonFunc(); } }
        disabled
      >
        Entrar
      </button>
    );
  }

  ON() {
    return (
      <button
        type="button"
        data-testid="login-submit-button"
        onClick={ () => { this.buttonFunc(); } }
      >
        Entrar
      </button>
    );
  }

  render() {
    const { isLoading, hasLogged } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="insert your name in here"
            onChange={ this.setName }
          />
          {this.autorizeButton() ? this.ON() : this.OFF()}
          {isLoading && <Loading />}
          {hasLogged && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}
