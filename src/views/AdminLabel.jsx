import { useState, useEffect, useContext } from 'react';
import { AdminCont } from '../context/AdminContext';
import { useParams } from 'react-router-dom';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Label } from '../styled-components/Label';
import { Nav } from '../styled-components/Navbar';
import { AdminNav } from '../styled-components/AdminNav';
import { Wrapper } from '../styled-components/PageWrapper';

function AdminLabel() {
  const [labelInfo, setLabelInfo] = useState([]);
  const { newCancelToken, isCancel } = useCancelToken();
  const { token } = useContext(AdminCont);
  let { label } = useParams();
  let history = useHistory();

  function sendTo(route) {
    history.push(`/panel/folder/${route}`);
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'panel/label/' + label, {
      cancelToken: newCancelToken(),
      withCredentials: true,
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setLabelInfo(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [isCancel, newCancelToken, label, token]);

  return (
    <>
      <Nav />
      <AdminNav />
      <Wrapper>
        <Label name={label} label={labelInfo} sendTo={sendTo}/>
      </Wrapper>
    </>
  );
};

export default AdminLabel;