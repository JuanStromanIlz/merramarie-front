import {useState, useEffect} from 'react';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function PublicHome() {
  const [home, setHome] = useState([]);
  const { newCancelToken, isCancel } = useCancelToken();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/', {
      cancelToken: newCancelToken()
    }).then((res) => {
      setHome(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <h1>HOME</h1>
  );
};

export default PublicHome;