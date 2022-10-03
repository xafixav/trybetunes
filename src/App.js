import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Album from './Components/Album';
import Header from './Components/Header';
import Favorites from './Components/Favorites';
import NotFound from './Components/NotFound';
import Profile from './Components/Profile';
import ProfileEdit from './Components/ProfileEdit';
import Search from './Components/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header { ... this.state } />
          <Switch>
            <Route exact path="/" />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
