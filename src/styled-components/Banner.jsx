import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import { StickyTitle } from './StickyTitle';

const Banner = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-left: 2.6rem;
  padding-right: 2.6rem;
  :after {
    z-index: -1;
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${props => props.source});
    background-size: cover;
    background-position: center;
    animation-name: fadeIn;
    animation-duration: 5s; 
    animation-timing-function: ease-out; 
    animation-delay: 1.5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: .7;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: .7;
    }
    100% {
      opacity: 0;
    }
  }
  display: grid;
  place-items: center;
  h1 {
    text-align: center;
    font-size: 10.6rem;
    line-height: 10.6rem;
    font-type: italic;
    -webkit-text-stroke: 3px ${props => props.theme.colors.red};
    color: transparent;
  }
  @media (min-width: 920px) {
    place-items: center left;
    :after {
      background-size: contain;
      background-position: center;
      background-repeat: repeat-x;
    }
    h1 {
      text-align: left;
      font-size: 14.6rem;
      line-height: 14.6rem;
    }
  }
`;

const BannerContainer = ({source, title}) => {
  const [load, setLoad] = useState(true);
  const [images, setImages] = useState({});
  const [imageShow, setimageShow] = useState(null);
  const { newCancelToken, isCancel } = useCancelToken();

  useEffect(() => {
    if (load) {
      axios.get(process.env.REACT_APP_APIHOST + 'public/folder/vanesa_krongold', {
        cancelToken: newCancelToken()
      }).then((res) => {
        setImages(res.data.images);
        setLoad(false);
      }).catch((error) => {
        if (isCancel(error)) return;
      });
    } else {
      setInterval(() => {
        let img = Math.floor(Math.random() * (images.length + 1));
        setimageShow(images[img].url);
      }, 10000);
    }
  }, [images]);

  return (
    <Banner source={imageShow}>
      <h1>Merra Marie</h1>
    </Banner>
  )
};

export { BannerContainer as Banner };