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
import {StyledApp, theme} from './styled-components/StyledApp';
//Admin Views
import AdminContext from './context/AdminContext';
import PrivateRoute from './components/PrivateRoute';
import AdminLog from './views/AdminLog';
import AdminLogOut from './views/AdminLogOut';
import AdminFolder from './views/AdminFolder';
import AdminNewEntry from './views/AdminNewEntry';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp />
      <Router>
        <Switch>
          <Route exact path='/' render={() => <PublicHome />}/>
          <Route exact path='/editorial' render={(props) => <PublicLabel {...props} labelName='Editorial' />} />
          <Route exact path='/artwork' render={(props) => <PublicLabel {...props} labelName='Artwork' />} />
          <Route exact path='/commercial' render={(props) => <PublicLabel {...props} labelName='Comercial' />} />
          <Route exact path='/films' render={(props) => <PublicLabel {...props} labelName='Films' />} />
          <Route exact path='/exhibitions' render={(props) => <PublicLabel {...props} labelName='Exhibiciones' />} />
          <Route exact path='/publications' render={(props) => <PublicLabel {...props} labelName='Publicaciones' />} />
          <Route exact path='/about_me' component={AboutMe} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/:name' render={() => <PublicFolder />}/>
          <AdminContext>
            <Route exact path='/panel/log_in'component={AdminLog} />
            <PrivateRoute exact path='/panel/log_out' component={AdminLogOut}/>
            <PrivateRoute exact path='/panel/new' component={AdminNewEntry}/>
            <PrivateRoute exact path='/panel/folder/:name' component={AdminFolder}/>
          </AdminContext>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
