import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';
import {Loading} from '../styled-components/Loading';
import {Folder} from '../styled-components/Folder';
import { Nav } from '../styled-components/Navbar';

function PublicFolder() {
  const [folder, setFolder] = useState({});
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();
  let {name} = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/folder/' + name, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setFolder(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [isCancel, name, newCancelToken]);

  return (
    <>
      {loading ?
        <Loading />
      : 
      <>
        <Nav />
        <Folder folder={folder}/>
      </>}
    </>
  );
};

export default PublicFolder;