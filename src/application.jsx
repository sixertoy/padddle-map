import React from 'react';
import { createUseStyles } from 'react-jss';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div classes={classes.container} id="app-container">
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
    </div>
  );
};

export default App;
