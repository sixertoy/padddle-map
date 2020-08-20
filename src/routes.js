import FacebookRedirectPage from './pages/fblogin';
import MapPage from './pages/map';
import SharePage from './pages/share';

export const ROUTES_ID = {
  FBLOGIN: 'fblogin-page',
  MAP: 'map-page',
  SHARE: 'share-page',
};

const routes = [
  {
    component: FacebookRedirectPage,
    exact: true,
    id: ROUTES_ID.FBLOGIN,
    path: '/login',
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
    path: ['/:mapconfig?'],
  },
];

export default routes;
