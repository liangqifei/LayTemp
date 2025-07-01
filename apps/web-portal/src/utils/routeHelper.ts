// src/utils/routeHelper.js

export function filterRoutesByRole(routes, userRole) {
  return routes
    .filter(route => !route.meta?.roles || route.meta.roles.includes(userRole))
    .map(route => ({
      ...route,
      children: route.children ? filterRoutesByRole(route.children, userRole) : undefined
    }));
}

export function getMenuFromRoutes(routes) {
  return routes
    .filter(route => !route.meta?.hideInMenu)
    .map(route => ({
      ...route,
      children: route.children ? getMenuFromRoutes(route.children) : undefined
    }));
}