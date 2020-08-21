import classnames from 'classnames';
// import get from 'lodash.get';
// import queryString from 'query-string';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Loader from './components/commons/loader';
import { DEBUG_MODE } from './constants';
import Page404 from './pages/page-404';
import routes from './routes';

// const forceFacebookRedirect = () => {
//   const { origin, search } = window.location;
//   const query = queryString.parse(search);
//   const state = get(query, 'state');
//   if (state === 'facebookdirect') {
//     window.location.href = `${origin}/#/fblogin/${search}`;
//   }
// };

const Application = function Application() {
  const loading = useSelector(_ => _.loading);
  // const search = get(window, 'location.search', null);
  // if (search) forceFacebookRedirect();
  return (
    <div className={classnames({ debug: DEBUG_MODE })} id="app-container">
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
      {loading && <Loader />}
    </div>
  );
};

export default Application;
