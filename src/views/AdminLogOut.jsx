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
    history.push('/');
  }, [setToken, history]);

  return (
    <span>close</span>
  );
}

export default AdminLogOut;