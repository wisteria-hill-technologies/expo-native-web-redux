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
    case '/categories':
      return { title: 'Categories', name: 'categories', routeType: 'private' };
    case '/category':
      return { title: 'Category', name: 'category', routeType: 'private' };
    case '/category/new':
      return { title: 'Add New Category', name: 'categoryNew', routeType: 'private' };
    case '/category/edit':
      return { title: 'Edit Category', name: 'categoryEdit', routeType: 'private' };
    default:
      return { title: 'Categories', name: 'categories', routeType: 'private' };
  }
};

export default routeTitleMapper;

