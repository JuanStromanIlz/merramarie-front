import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function PublicFolder() {
  const [folder, setFolder] = useState({});
  const { newCancelToken, isCancel } = useCancelToken();
  let {name} = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/folder/' + name, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setFolder(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <h1>Public folder {name}</h1>
  );
};

export default PublicFolder;