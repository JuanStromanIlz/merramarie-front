import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import { Loading } from '../styled-components/Loading';
import { List } from '../styled-components/List';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';

function PublicList() {
  const [adminRoutes, setAdminRoutes] = useState(false);
  const [labelInfo, setLabelInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();

  useEffect(() => {
    window.document.title= 'Publicaciones | Merra Marie';
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
    axios.get(process.env.REACT_APP_APIHOST + 'public/label/publications', {
      cancelToken: newCancelToken()
    }).then((res) => {
      setLabelInfo(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    loading ?
      <Loading />
    :
    <>
      <Nav />
      <Wrapper>
        <List folder={labelInfo} adminRoutes={adminRoutes} />
      </Wrapper>
    </>
  );
};

export default PublicList;