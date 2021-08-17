import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { Loading } from '../styled-components/Loading';
import { Folder } from '../styled-components/Folder';
import { Nav } from '../styled-components/Navbar';
import { Footer } from '../styled-components/Footer';
import { Wrapper } from '../styled-components/PageWrapper';

function PublicFolder() {
  const [folder, setFolder] = useState({});
  const [loading, setLoading] = useState(true);
  const { newCancelToken, isCancel } = useCancelToken();
  let {label, title} = useParams();

  useEffect(() => {
    function metaFolder(folder) {
      /* og:type */
      window.document.querySelector('meta[property="og:type"]').setAttribute("content", "article");
      /*og:title */
      window.document.querySelector('meta[property="og:title"]').setAttribute("content", `${folder.title} por Merra Marie`);
      window.document.querySelector('meta[name="twitter:title"]').setAttribute("content", `${folder.title} por Merra Marie`);
      window.document.title= `${folder.title} por Merra Marie`;
      /* og:description default */
      window.document.querySelector('meta[name="description"]').setAttribute("content", 'Ver este y otros trabajos en mi web.');
      window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Ver este y otros trabajos en mi web.');
      /* og:url */
      window.document.querySelector('meta[property="og:url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/folder/${folder.label}/${folder.route_title}`);
      /* og:image default */
      window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      if ('images' in folder) {
        let metaImg = folder.images[0].url;
        window.document.querySelector('meta[property="og:image"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[property="og:image:width"]').setAttribute("content", 871);
        window.document.querySelector('meta[property="og:image:height"]').setAttribute("content", 564);
      }
      if ('description' in folder) {
        window.document.querySelector('meta[name="description"]').setAttribute("content", folder.description);
        window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", folder.description);
      }
    }
    setLoading(true);
    axios.get(`${process.env.REACT_APP_APIHOST}public/${label}/${title}`, {
      cancelToken: newCancelToken()
    }).then((res) => {
      setFolder(res.data);
      metaFolder(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [label, title]);

  return (
    loading ?
      <Loading />
    : 
    <>
      <Nav />
      <Wrapper>
        <Folder folder={folder}/>
      </Wrapper>
      <Footer label={folder.label} nextFolder={folder.nextFolder} />
    </>
  );
};

export default PublicFolder;