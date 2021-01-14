import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../../routes/Home/Home';
import AdoptRoute from '../../routes/AdoptRoute/AdoptRoute';

class App extends Component {
  render() {
    return (
      <div className="root">
        <header>
          <Route path="/" component={Header} />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={'/adoption'} component={AdoptRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;