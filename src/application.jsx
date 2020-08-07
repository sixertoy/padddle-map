import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Loader from './components/loader';
import Modals from './components/modals';
import Page404 from './pages/page-404';
import routes from './routes';

const USE_DEBUG = false;

const App = () => {
  const modal = useSelector(_ => _.modal);
  const loading = useSelector(_ => _.loading);
  return (
    <div className={classnames({ debug: USE_DEBUG })} id="app-container">
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
        <Route component={Page404} path="*" />
      </Switch>
      {modal && <Modals type={modal} />}
      {loading && <Loader />}
    </div>
  );
};

export default App;
