import {useState, useEffect, useContext} from 'react';
import {AdminCont} from '../context/AdminContext';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function PublicFolder() {
  const [folder, setFolder] = useState({});
  const { newCancelToken, isCancel } = useCancelToken();
  const {token} = useContext(AdminCont);
  let {label, name} = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'panel/items/' + label + '/' + name, {
      cancelToken: newCancelToken(),
      withCredentials: true,
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setFolder(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <h1>Private {label + name}</h1>
  );
};

export default PublicFolder;