const pojo = {};
const globalRoutes = [];

function createMatch(self = pojo, routes = globalRoutes, cb = null) {
  return (path, { to: component }) => {
    let route = { path, component };
    if (typeof cb === 'function') {
      route = cb(route);
    }
    routes.push(route);
    return self;
  };
}

function createRoot(self = pojo, routes = globalRoutes, cb = null) {
  const match = createMatch(self, routes, cb);
  return options => match('/', options);
}

Object.assign(pojo, {
  routes: globalRoutes,
  match: createMatch(),
  root: createRoot(),
  authenticated: () => {
    const self = {};
    const cb = route => ({ ...route, requiresAuthentication: true });
    Object.assign(self, {
      match: createMatch(self, globalRoutes, cb),
      root: createRoot(self, globalRoutes, cb)
    });
    return self;
  },
  unmatched({ to: component }) {
    globalRoutes.push({ component });
  },
  getPrivateRoutes() {
    return globalRoutes.filter(e => e.requiresAuthentication).map(e => e.path);
  }
});

module.exports = pojo;
