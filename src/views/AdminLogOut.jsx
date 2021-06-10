import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AdminCont } from "../context/AdminContext";

function AdminLogOut() {
  const {setToken} = useContext(AdminCont);
  let history = useHistory();
  
  function closeAdmin() {
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    setToken(false);
  }

  useEffect(() => {
    closeAdmin();
    history.push('/panel');
  }, []);

  return (
    <h1>AdminLogOut</h1>
  );
}

export default AdminLogOut;