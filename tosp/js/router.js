// router.js — minimal hash-based router. No framework dependency.
// Routes are matched against window.location.hash using ":param" segments.

const routes = [];
let notFoundHandler = () => {};
let lastPath = null;

export function registerRoute(pattern, handler) {
  const paramNames = [];
  const regexSource = pattern
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        paramNames.push(segment.slice(1));
        return '([^/]+)';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');

  routes.push({ regex: new RegExp(`^${regexSource}$`), paramNames, handler });
}

export function registerNotFound(handler) {
  notFoundHandler = handler;
}

function currentPath() {
  const hash = window.location.hash || '#/dashboard';
  return hash.slice(1) || '/dashboard';
}

function resolve(path) {
  for (const route of routes) {
    const match = path.match(route.regex);
    if (match) {
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      return { handler: route.handler, params };
    }
  }
  return null;
}

/** Re-renders whatever route is currently active. Used after state mutations. */
export function rerender() {
  const path = currentPath();
  const match = resolve(path);
  if (match) {
    match.handler(match.params);
  } else {
    notFoundHandler();
  }
}

export function navigate(path) {
  if (window.location.hash === `#${path}`) {
    rerender();
  } else {
    window.location.hash = path;
  }
}

export function startRouter() {
  window.addEventListener('hashchange', rerender);
  if (!window.location.hash) {
    window.location.hash = '#/dashboard';
  }
  rerender();
}
