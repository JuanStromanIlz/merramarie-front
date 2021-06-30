import { useState, useEffect } from 'react';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Loading } from '../styled-components/Loading';
import { Label } from '../styled-components/Label';
import { Nav } from '../styled-components/Navbar';


function PublicLabel() {
  const [labelInfo, setLabelInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();
  const label = window.location.pathname;
  let history = useHistory();

  function sendTo(route) {
    history.push(`/${route}`);
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/label' + label, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setLabelInfo(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [isCancel, label, newCancelToken]);

  return (
    <>
      {loading ?
        <Loading />
      : 
      <>
        <Nav />
        <Label name={label} label={labelInfo} sendTo={sendTo}/>
      </>}
    </>
  );
};

export default PublicLabel;