import {useState, useEffect} from 'react';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { Loading } from '../styled-components/Loading';
import { Nav } from '../styled-components/Navbar';
import { StickyTitle } from '../styled-components/StickyTitle';

function PublicHome() {
  const [home, setHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/', {
      cancelToken: newCancelToken()
    }).then((res) => {
      setHome(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [isCancel, newCancelToken]);

  return (
    <>
      {loading ?
        <Loading />
      : 
      <>
        {/* <Nav /> */}
        <StickyTitle>Home</StickyTitle>
      </>}
    </>
  );
};

export default PublicHome;