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
import AdminNewEntry from './views/AdminNewEntry';

function App() {
  const labels = ['editorial', 'artwork', 'commercial', 'films', 'exhibitions', 'publications'];
  return (
    <ThemeProvider theme={theme}>
      <StyledApp />
      <Router>
        <Switch>
          <Route exact path='/' render={() => <PublicHome />}/>
          {labels.map(label => {
            return <Route exact path={`/${label}`} render={() => <PublicLabel />}/>
          })}
          <Route exact path='/:name' render={() => <PublicFolder />}/>
          <AdminContext>
            <Route exact path='/panel/log' render={() => <AdminLog />}/>
            <PrivateRoute exact path='/panel/close' component={AdminLogOut}/>
            <PrivateRoute exact path='/panel/new' component={AdminNewEntry}/>
            <PrivateRoute exact path='/panel/control' component={AdminControl}/>
            <PrivateRoute exact path='/panel/label/:label' component={AdminLabel}/>
            <PrivateRoute exact path='/panel/folder/:name' component={AdminFolder}/>
          </AdminContext>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
