import LandingPage from './pages/landing';
import MapPage from './pages/map';

export const ROUTES_ID = {
  LANDING: 'landing',
  MAP: 'map',
};

const routes = [
  {
    component: LandingPage,
    exact: true,
    id: ROUTES_ID.LANDING,
    path: '/',
  },
  {
    component: MapPage,
    exact: true,
    id: ROUTES_ID.MAP,
    path: '/map',
  },
];

export default routes;
