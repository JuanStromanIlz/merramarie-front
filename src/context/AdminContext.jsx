import {createContext, useEffect, useState} from 'react';

const AdminCont = createContext();
const {Consumer, Provider} = AdminCont;

const AdminContext = ({children}) => {
  const [token, setToken] = useState(false);

  useEffect(()=> {
    /* LOCAL STORAGE */
    let merraMariePortfolio = localStorage;
    let localToken = merraMariePortfolio.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    setToken(localToken);
  }, []);
  
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