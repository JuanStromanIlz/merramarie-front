import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AdminCont } from '../context/AdminContext';

function PrivateRoute({component: Component, path, exact}) {
  const {token} = useContext(AdminCont);

  return (
    <Route 
      path={path}
      exact={exact}
      render={() =>
        token ? 
        (<Component />) : 
        (<Redirect to='/' />)
      }
    />
  );
}

export default PrivateRoute;