import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AdminCont } from "../context/AdminContext";

function AdminLogOut() {
  const {setToken} = useContext(AdminCont);
  let history = useHistory();

  useEffect(() => {
    function closeAdmin() {
      localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
      setToken(false);
    }
    closeAdmin();
    history.push('/panel');
  }, [setToken, history]);

  return (
    <h1>AdminLogOut</h1>
  );
}

export default AdminLogOut;