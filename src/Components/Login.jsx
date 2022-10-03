import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      criar: createUser,
      isLoading: false,
      hasLogged: false,
    };
    this.ON = this.ON.bind(this);
    this.OFF = this.OFF.bind(this);
  }

  autorizeButton = () => {
    const { user } = this.state;
    const MIN = 3;
    const BOOLEAN = user.length >= MIN;
    return BOOLEAN;
  }

  buttonFunc = async () => {
    const { user, criar } = this.state;
    const { create } = this.props;
    this.setState({ isLoading: true });
    await criar({ name: user });
    await create();
    this.setState({ hasLogged: true });
  }

  setName = (event) => {
    const { value } = event.target;
    this.setState({ user: value });
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

Login.propTypes = {
  create: PropTypes.func.isRequired,
};
