import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../styled-components/Loading';
import { Banner } from '../styled-components/Banner';

function PublicHome() {
  const [loading, setLoading] = useState(true);
  const [imageShow, setimageShow] = useState(null);

  useEffect(()=> {
    function metaHome() {
      /* og:type */
      window.document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
      /* og:title */
      window.document.querySelector('meta[property="og:title"]').setAttribute("content", "Merra Marie");
      window.document.querySelector('meta[name="twitter:title"]').setAttribute("content", "Merra Marie");
      window.document.title= "Merra Marie";
      /* og:description */
      window.document.querySelector('meta[name="description"]').setAttribute("content", 'Portfolio personal.');
      window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Portfolio personal.');
      window.document.querySelector('meta[property="og:url"]').setAttribute("content", process.env.REACT_APP_FRONTEND);
      /* og:images default */
      window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    }
    async function getInfo() {
      let promises = [];
      let urls = [];
      let labels = await axios.get(`${process.env.REACT_APP_APIHOST}public/all`);
      if (labels) {
        let list = labels.data;
        list.map(label => {
          let promise = axios.get(`${process.env.REACT_APP_APIHOST}public/${label}`);
          promises.push(promise);
        });
        let promisesList = await Promise.all(promises);
        promisesList.filter(labels => {
          labels.data.map(item => {
            if ('images' in item) {
              let images = Array.from(item.images);
              images.map(image => urls.push(image.url));
            }
          });
        });
        if (urls.length > 0) {
          let img = Math.floor(Math.random() * (urls.length + 1));
          setimageShow(urls[img]);
          window.document.querySelector('meta[property="og:type"]').setAttribute("content", "article");
          window.document.querySelector('meta[property="og:image"]').setAttribute("content", urls[img]);
          window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", urls[img]);
          window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", urls[img]);
          window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", urls[img]);
          window.document.querySelector('meta[property="og:image:width"]').setAttribute("content", 871);
          window.document.querySelector('meta[property="og:image:height"]').setAttribute("content", 564);
        }
        setLoading(false);
      }
    }
    metaHome();
    getInfo();
  }, []);

  return (
    loading ?
      <Loading />
    :
     <Banner img={imageShow} loading={loading} />
  );
};

export default PublicHome;