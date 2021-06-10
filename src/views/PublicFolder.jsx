import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function PublicFolder() {
  const [folder, setFolder] = useState({});
  const { newCancelToken, isCancel } = useCancelToken();
  let {label, name} = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/' + label + '/' + name, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setFolder(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <h1>Public {label + name}</h1>
  );
};

export default PublicFolder;