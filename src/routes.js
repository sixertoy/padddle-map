import MapPage from './pages/map';

export const ROUTES_ID = {
  MAP: 'map',
};

const routes = [
  {
    component: MapPage,
    exact: true,
    id: ROUTES_ID.MAP,
    path: '/:mapconfig?',
  },
];

export default routes;
