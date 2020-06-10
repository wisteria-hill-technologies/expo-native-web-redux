const routeTitleMapper = (pathname) => {
  let path = pathname;
  if (
    pathname.includes('/category')
    && pathname !== '/category/new'
    && !pathname.includes('/category/edit')
  ) {
    path = '/category';
  } else if (pathname.includes('/category/edit')) {
    path = '/category/edit';
  }

  switch(path) {
    case '/':
      return { title: 'Log In', name: 'login', routeType: 'publicOnly' };
    case '/signup':
      return { title: 'Sign Up', name: 'signup', routeType: 'publicOnly' };
    case '/dashboard':
      return { title: 'Dashboard', name: 'dashboard', routeType: 'private' };
    default:
      return { title: 'Dashboard', name: 'dashboard', routeType: 'private' };
  }
};

export default routeTitleMapper;

