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
    path: '/fblogin',
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
    path: [
      '/',
      '_=_', // facebook
      '/:mapconfig([0-9]+\\.?[0-9]*?,[0-9]+\\.?[0-9]*?,?[0-9]*)',
    ],
  },
];

export default routes;
