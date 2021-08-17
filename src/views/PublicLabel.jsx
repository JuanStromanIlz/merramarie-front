import { useState, useEffect } from 'react';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { Loading } from '../styled-components/Loading';
import { Label } from '../styled-components/Label';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';

function PublicLabel({labelName}) {
  const [adminRoutes, setAdminRoutes] = useState(false);
  const [labelInfo, setLabelInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();
  const label = window.location.pathname;

  useEffect(() => {
    function metaLabel(folders) {
      /* og:type */
      window.document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
      /* og:title */
      window.document.querySelector('meta[property="og:title"]').setAttribute("content", `${labelName} | Merra Marie`);
      window.document.querySelector('meta[name="twitter:title"]').setAttribute("content", `${labelName} | Merra Marie`);
      window.document.title= `${labelName} | Merra Marie`;
      /* og:description */
      if (labelName !== 'Blog') {
        window.document.querySelector('meta[name="description"]').setAttribute("content", 'Trabajos destacados.');
        window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Trabajos destacados.');
      } else {
        window.document.querySelector('meta[name="description"]').setAttribute("content", 'Mi blog personal.');
        window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Mi blog personal.');
      }
      window.document.querySelector('meta[property="og:url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/${label}`);
      /* og:images default */
      window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      /* if label have imgs */
      let itemFilter = folders.find(folder => folder.images);
      if (itemFilter !== undefined) {
        let metaImg = itemFilter.images[0].url;
        window.document.querySelector('meta[property="og:type"]').setAttribute("content", "article");
        window.document.querySelector('meta[property="og:image"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[property="og:image:width"]').setAttribute("content", 871);
        window.document.querySelector('meta[property="og:image:height"]').setAttribute("content", 564);
      }
    }
    setLoading(true);
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
    axios.get(`${process.env.REACT_APP_APIHOST}public/${label}`, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setLabelInfo(res.data);
      setLoading(false);
      metaLabel(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [label,labelName]);

  return (
    loading ?
      <Loading />
    : 
    <>
      <Nav />
      <Wrapper>
        <Label name={labelName} label={labelInfo} adminRoutes={adminRoutes}/>
      </Wrapper>
    </>
  );
};

export default PublicLabel;