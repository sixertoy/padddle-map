import FacebookLoginPage from './pages/fblogin';
import MapPage from './pages/map';
import SharePage from './pages/share';

export const ROUTES_ID = {
  FACEBOOK_LOGIN: 'fblogin-page',
  MAP: 'map-page',
  SHARE: 'share-page',
};

const routes = [
  {
    component: FacebookLoginPage,
    exact: true,
    id: ROUTES_ID.FACEBOOK_LOGIN,
    path: ['/_=_', '_=_'],
  },
  {
    component: SharePage,
    exact: true,
    id: ROUTES_ID.SHARE,
    path: '/share/:id',
  },
  {
    component: MapPage,
    exact: true,
    id: ROUTES_ID.MAP,
    path: ['/', '/:mapconfig?'],
  },
];

export default routes;
