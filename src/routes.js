import FacebookRedirectPage from './pages/facebook';
import MapPage from './pages/map';
import SharePage from './pages/share';

export const ROUTES_ID = {
  MAP: 'map-page',
  SHARE: 'share-page',
};

const routes = [
  {
    component: MapPage,
    exact: true,
    id: ROUTES_ID.MAP,
    path: '/:mapconfig?',
  },
  {
    component: SharePage,
    exact: true,
    id: ROUTES_ID.SHARE,
    path: '/share/:id',
  },
  {
    component: FacebookRedirectPage,
    exact: true,
    id: ROUTES_ID.FACEBOOK_REDIRECT_PAGE,
    path: '/facebook/:params',
  },
];

export default routes;
