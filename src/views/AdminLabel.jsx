import {useState, useEffect, useContext} from 'react';
import {AdminCont} from '../context/AdminContext';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function AdminLabel() {
  const [labelInfo, setLabelInfo] = useState([]);
  const { newCancelToken, isCancel } = useCancelToken();
  const {token} = useContext(AdminCont);
  let {label} = useParams();

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
  }, []);

  return (
    <h1>Private {label}</h1>
  );
};

export default AdminLabel;