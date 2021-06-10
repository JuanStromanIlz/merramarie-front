import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';

function PublicLabel() {
  const [labelInfo, setLabelInfo] = useState([]);
  const { newCancelToken, isCancel } = useCancelToken();
  let {label} = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'public/' + label, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setLabelInfo(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <h1>Public {label}</h1>
  );
};

export default PublicLabel;