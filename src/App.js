import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
//Public Views
import AboutMe from './views/AboutMe';
import Contact from './views/Contact';
import PublicLabel from './views/PublicLabel';
import PublicFolder from './views/PublicFolder';
import PublicHome from './views/PublicHome';
import PublicList from './views/PublicList';
import {StyledApp, theme} from './styled-components/StyledApp';
//Admin Views
import AdminContext from './context/AdminContext';
import PrivateRoute from './components/PrivateRoute';
import AdminLog from './views/AdminLog';
import AdminLogOut from './views/AdminLogOut';
import AdminFolder from './views/AdminFolder';
import AdminNewEntry from './views/AdminNewEntry';
import ErrorView from './views/ErrorView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AdminContext>
        <StyledApp />
        <Router>
          <Switch>
            <Route exact path='/' component={PublicHome}/>
            <Route exact path='/editorial' render={(props) => <PublicLabel {...props} labelName='Editorial' />} />
            <Route exact path='/artwork' render={(props) => <PublicLabel {...props} labelName='Artwork' />} />
            <Route exact path='/commercial' render={(props) => <PublicLabel {...props} labelName='Comercial' />} />
            <Route exact path='/films' render={(props) => <PublicLabel {...props} labelName='Films' />} />
            <Route exact path='/blog' render={(props) => <PublicLabel {...props} labelName='Blog' />} />
            <Route exact path='/publications' component={PublicList} />
            <Route exact path='/about_me' component={AboutMe} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/error' component={ErrorView} />
            <Route path='/folder/:label/:title' component={PublicFolder}/>
            <Route exact path='/panel' component={AdminLog} />
            <PrivateRoute path='/panel/log_out' component={AdminLogOut} />
            <PrivateRoute path='/panel/new' component={AdminNewEntry} />
            <PrivateRoute path='/panel/folder/:label/:title' component={AdminFolder} />
          </Switch>
        </Router>
      </AdminContext>
    </ThemeProvider>
  );
}

export default App;
