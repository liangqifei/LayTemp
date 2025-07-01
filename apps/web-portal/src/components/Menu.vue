import { getMenuFromRoutes } from '../utils/routeHelper';
import routesData from '../mock/routes.json';

const userRole = 'admin';
const menu = getMenuFromRoutes(filterRoutesByRole(routesData, userRole));

// 渲染 menu