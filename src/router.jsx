// routes.js
import { Outlet, createBrowserRouter } from 'react-router-dom';
import AppIndex from './views/AppIndex';
import AppSearch from './views/AppSearch';
import StationLibrary from './views/StationLibrary.jsx';
import StatsView from './views/StatsView.jsx';

const routes = [
 {
  path: '/',
  element: <AppIndex />,
  // guard: requireAuth,
 },
 {
  path: '/about',
  element: < AppSearch />,
  // guard: requireAuth,
 },
 {
  path: '/contact',
  element: <StationLibrary />,
 },
 {
  path: '/stats',
  element: <StatsView />,
 },
 {
  path: '*',
  element: Outlet,
 },
];

// navigation guard
function requireAuth(currentLocation, nextLocation) {
 // Check if the user is authenticated
 if (!isAuthenticated) {
  // Redirect to login page with a query parameter to indicate the intended route
  navigate('/login?redirect=' + nextLocation.pathname);
  return false;
 }
 return true;
}

export const router = createBrowserRouter(routes);


