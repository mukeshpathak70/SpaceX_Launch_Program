import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './Head';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading: () => <div>Loading...</div>
});

const App = () => (
  <div className="app">
    <Head />
    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
      </Switch>
    </main>

    <footer>
      <div><p className="text-center">Developed by: <span>Mukesh Pathak</span></p></div>
    </footer>
  </div>
);

export default App;
