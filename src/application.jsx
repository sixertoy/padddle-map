import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

const App = () => (
  <Switch>
    {routes.map(obj => {
      // const isvalid = obj.id && obj.path && obj.component;
      // TODO add to debug logger if route not valid
      return (
        <Route
          key={obj.id}
          component={obj.component}
          exact={obj.exact}
          path={obj.path}
        />
      );
    })}
  </Switch>
);

export default App;
