import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import { StickyTitle } from './StickyTitle';
import { Loading } from './Loading';

const Banner = styled.div`
  #cortina {
    position: absolute;
    background: black;
    inset: 0;
    transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    h1 {
      align-self: center;
      text-align: center;
      font-size: 10rem;
      font-weight: 400;
      line-height: 10rem;
      -webkit-text-stroke: 2px ${props => props.theme.colors.red};
      color: transparent;
    }
    #textContainer {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding: 2.6rem;
      .clickToOpen {
        width: fit-content;
        top: -100%;
        border-radius: 50%;
        aspect-ratio: 1;
        border: 1px solid ${props => props.theme.colors.pink};
        background: transparent;
        backdrop-filter: blur(2px);
        padding: 1.3rem;
        color: ${props => props.theme.colors.pink};
        animation: pulse .8s infinite alternate;
        span {
          font-size: 2rem;
          display: block;
        }
        @keyframes pulse {
          0% {
            border-width: 1px;
          }
          100% {
            border-width: 3px;
            box-shadow: 0 0 10px 1px ${props => props.theme.colors.pink};
          }
        }
      }
    }
    img {
      opacity: 0;
      transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  #homeMenu { 
    padding: 0 2.6rem;
    ul {
      min-height: 100vh;
      list-style-type:none;
      padding-left: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      li {
        font-size: 4rem;
        font-weight: 400;
        line-height: 4rem;
        a {
          -webkit-text-stroke: 2px ${props => props.theme.colors.red};
          color: transparent;
        }
      }
    }
  }
  @media (hover: hover) {
    #homeMenu ul li:hover a {
      color: ${props => props.theme.colors.red};
      -webkit-text-stroke: inherit;
    }
  }
  @media (min-width: 920px) {
    h1 {
      font-size: 13rem !important;
      line-height: 13rem !important;
    }
    #textContainer {
      .clickToOpen {
        position: absolute;
      }
    }
    #homeMenu {
      ul li {
        font-size: 5rem;
      }
    }
  }
`;

const BannerContainer = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imageShow, setimageShow] = useState(0);
  const { newCancelToken, isCancel } = useCancelToken();

  function openHome() {
    document.getElementById('cortina').style.cssText='transform: translateX(-100%); opacity: 0;';
  }

  useEffect(() => {
    function onMouseMove(e) {
      document.getElementById('circle').style.cursor='none';
      document.getElementById('circle').style.transform='translate(-50%,-50%)';
      document.getElementById('circle').style.left = e.pageX + 'px';
      document.getElementById('circle').style.top = e.pageY + 'px';
    }
    if (loading) {
      async function getInfo() {
        let promises = [];
        let urls = [];
        let labels = await axios.get(process.env.REACT_APP_APIHOST + 'public/all', {cancelToken: newCancelToken()});
        if (labels) {
          let list = labels.data;
          list.map(label => {
            let promise = axios.get(process.env.REACT_APP_APIHOST + 'public/label/' + label);
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
          setImages(urls);
          let img = Math.floor(Math.random() * (images.length + 1));
          setimageShow(images[img]);
          setLoading(false);
          setTimeout(() => {
            let showImgs = document.getElementsByTagName('img');
            for (let i = 0; i < showImgs.length; i++) {
              document.getElementsByTagName('img')[i].style.opacity='1';
            }
          }, 700);
        }
      }
      getInfo();
    } else {
      document.addEventListener('mousemove', onMouseMove);
    }
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [images]);

  return (
    loading ?
    <Loading />
    : 
      <Banner>
        <div id='cortina' onClick={openHome}>
          {images.length === 0 ?
            <h1>Merra Marie</h1>
          : 
          <>
            <img src={imageShow} alt=''></img>
            <img src={imageShow} alt=''></img>
            <img src={imageShow} alt=''></img>
          </>}
          <div id='textContainer'>
            <button id='circle' className='clickToOpen'><span>click!</span></button>
          </div>
        </div>
        <div id='homeMenu'>
          <ul>
            <li><a href={`${process.env.REACT_APP_FRONTEND}editorial`}>editorial</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}artwork`}>artwork</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}commercial`}>comercial</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}films`}>films</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}blog`}>blog</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}publications`}>publicaciones</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}about_me`}>sobre mi</a></li>
            <li><a href={`${process.env.REACT_APP_FRONTEND}contact`}>contacto</a></li>
          </ul>
        </div>
      </Banner>
  )
};

export { BannerContainer as Banner };