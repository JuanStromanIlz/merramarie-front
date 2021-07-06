import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

  function sendTo(title, location) {
    if (adminRoutes) {
      history.push(`/panel/folder/${title}`);
    } else {
      window.open(location, '_blank');
    }
  }

  useEffect(() => {
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
        <List folder={labelInfo} sendTo={sendTo} />
      </Wrapper>
    </>
  );
};

export default PublicList;