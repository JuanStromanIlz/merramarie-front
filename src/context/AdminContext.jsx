import {createContext, useState} from 'react';

const AdminCont = createContext();
const {Consumer, Provider} = AdminCont;

/* LOCAL STORAGE */
const merraMariePortfolio = localStorage;
const localToken = merraMariePortfolio.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);

const AdminContext = ({children}) => {
  const [token, setToken] = useState(localToken);
  
  return (
    <Provider value={{
      token: token,
      setToken: setToken
    }}>
      {children}
    </Provider>
  );
};

export default AdminContext;
export { AdminCont, Consumer };