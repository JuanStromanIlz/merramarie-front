import {createContext, useState} from 'react';
import {logIn, Admin} from '../api-services/ServerSide';

const AdminCont = createContext();
const {Consumer, Provider} = AdminCont;

/* LOCAL STORAGE */

const merraMariePortfolio = localStorage;
const localAdmin = JSON.parse(merraMariePortfolio.getItem('admin'));
const localToken = merraMariePortfolio.getItem('token');

const AdminContext = ({children}) => {
  const [token, setToken] = useState(localToken);

  //Calls to API from admin
  const AdminService = Admin(token);

  async function adminLog(values) {

    let res = await logIn(values);
    console.log(res);
  }

  return (
    <Provider value={{
      logIn: adminLog
    }}>
      {children}
    </Provider>
  );
};

export default AdminContext;
export { AdminCont, Consumer };