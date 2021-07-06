import {useState, useEffect} from 'react';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { Loading } from '../styled-components/Loading';
import { Nav } from '../styled-components/Navbar';
import { Banner } from '../styled-components/Banner';
import { Wrapper } from '../styled-components/PageWrapper';
import { StickyTitle } from '../styled-components/StickyTitle';

function PublicHome() {
  const [home, setHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();

  useEffect(() => {
    setLoading(false);
    // axios.get(process.env.REACT_APP_APIHOST + 'public/', {
    //   cancelToken: newCancelToken()
    // }).then((res) => {
    //   setHome(res.data);
    //   setLoading(false);
    // }).catch((error) => {
    //   if (isCancel(error)) return;
    // });
  }, []);

  return (
    <>
      {loading ?
        <Loading />
      : 
      <>
        <Nav />
        <Wrapper>
          <StickyTitle>Home</StickyTitle>
        </Wrapper>
      </>}
    </>
  );
};

export default PublicHome;