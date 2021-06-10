import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
//Public Views
import PublicLabel from './views/PublicLabel';
import PublicFolder from './views/PublicFolder';
import PublicHome from './views/PublicHome';
import {StyledApp, theme} from './styled-components/StyledApp';
//Admin Views
import AdminContext from './context/AdminContext';
import PrivateRoute from './components/PrivateRoute';
import AdminLog from './views/AdminLog';
import AdminLogOut from './views/AdminLogOut';
import AdminControl from './views/AdminControl';
import AdminFolder from './views/AdminFolder';
import AdminLabel from './views/AdminLabel';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp />
      <Router>
        <Switch>
          <Route exact path='/' render={() => <PublicHome />}/>
          <Route exact path='/home/:label' render={() => <PublicLabel />}/>
          <Route exact path='/home/:label/:name' render={() => <PublicFolder />}/>
          <AdminContext>
            <Route exact path='/panel' render={() => <AdminLog />}/>
            <PrivateRoute exact path='/close' component={AdminLogOut}/>
            <PrivateRoute exact path='/control' component={AdminControl}/>
            <PrivateRoute exact path='/control/:label' component={AdminLabel}/>
            <PrivateRoute exact path='/control/:label/:name' component={AdminFolder}/>
          </AdminContext>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
