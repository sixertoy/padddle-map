import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Modals from './components/modals';
import Popup from './components/popup';
import routes from './routes';

const App = () => {
  const modal = useSelector(_ => _.modal);
  const selected = useSelector(_ => _.selected);
  return (
    <React.Fragment>
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
      {selected && <Popup id={selected} />}
      {modal && <Modals type={modal} />}
    </React.Fragment>
  );
};

export default App;
