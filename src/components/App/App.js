import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header.js';
import Homepage from '../../routes/Homepage/Homepage.js';
import AdoptionRoute from '../../routes/AdoptionRoute/AdoptionRoute.js';

export default class App extends Component {
  render() {
    return (
      <div className="root">
        <header>
          <Route path="/" component={Header} />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path={'/adoption'} component={AdoptionRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
