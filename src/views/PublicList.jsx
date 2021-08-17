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
    /* og:type */
    window.document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
    /* og:title */
    window.document.querySelector('meta[property="og:title"]').setAttribute("content", 'Publicaciones | Merra Marie');
    window.document.querySelector('meta[name="twitter:title"]').setAttribute("content", 'Publicaciones | Merra Marie');
    window.document.title= 'Publicaciones | Merra Marie';
    /* og:description */
    window.document.querySelector('meta[name="description"]').setAttribute("content", 'Publicaciones destacadas.');
    window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Publicaciones destacadas.');
    /* og:url */
    window.document.querySelector('meta[property="og:url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/publications`);
    /* og:images default */
    window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
    axios.get(`${process.env.REACT_APP_APIHOST}public/publications`, {
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