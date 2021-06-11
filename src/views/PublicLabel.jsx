import {useState, useEffect} from 'react';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function PublicLabel() {
  const [labelInfo, setLabelInfo] = useState([]);
  const { newCancelToken, isCancel } = useCancelToken();
  const label = window.location.pathname;

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/label' + label, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setLabelInfo(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <h1>Public label {label}</h1>
  );
};

export default PublicLabel;