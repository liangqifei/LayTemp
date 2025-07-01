// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { filterRoutesByRole } from '../utils/routeHelper';
import routesData from '../mock/routes.json';

const userRole = 'admin'; // 假设已获取
const filteredRoutes = filterRoutesByRole(routesData, userRole);

const router = createRouter({
  history: createWebHistory(),
  routes: filteredRoutes
});

export default router;