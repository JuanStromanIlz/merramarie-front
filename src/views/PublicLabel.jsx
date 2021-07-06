import { useState, useEffect } from 'react';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Loading } from '../styled-components/Loading';
import { Label } from '../styled-components/Label';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';
import { EmptyCard } from '../styled-components/EmptyCard';

function PublicLabel({labelName}) {
  const [adminRoutes, setAdminRoutes] = useState(false);
  const [labelInfo, setLabelInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();
  const label = window.location.pathname;
  let history = useHistory();

  function sendTo(route) {
    if (adminRoutes) {
      history.push(`/panel/folder/${route}`);
    } else {
      history.push(`/${route}`);
    }
  }

  useEffect(() => {
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
    axios.get(process.env.REACT_APP_APIHOST + 'public/label' + label, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setLabelInfo(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [label]);

  return (
    loading ?
      <Loading />
    : 
    <>
      <Nav />
      <Wrapper>
        {!labelInfo.length < 1 ?
          <Label name={labelName} label={labelInfo} sendTo={sendTo}/>
        : <EmptyCard />}
      </Wrapper>
    </>
  );
};

export default PublicLabel;