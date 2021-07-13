import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
      #heart {
        transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 0;
        display: inline-block;
        position: absolute;
        width: 80px;
        height: 80px;
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
        font-size: 3.6rem;
        font-weight: 400;
        line-height: 3.6rem;
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
      #lds-heart {
        position: absolute;
      }
    }
    #homeMenu {
      ul li {
        font-size: 5rem;
        line-height: 5rem;
      }
    }
  }
`;

const BannerContainer = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imageShow, setimageShow] = useState(0);

  function openHome() {
    document.getElementById('cortina').style.cssText='transform: translateX(-100%); opacity: 0;';
  }

  useEffect(() => {
    function onMouseMove(e) {
      document.getElementById('heart').style.cursor='pointer';
      document.getElementById('heart').style.transform='translate(-50%,-50%)';
      document.getElementById('heart').style.left = e.pageX + 'px';
      document.getElementById('heart').style.top = e.pageY + 'px';
    }
    if (loading) {
      async function getInfo() {
        let promises = [];
        let urls = [];
        let labels = await axios.get(process.env.REACT_APP_APIHOST + 'public/all');
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
  }, [images, loading]);

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
            <img id='heart' src={process.env.PUBLIC_URL + 'heart.svg'} alt='click'></img>
          </div>
        </div>
        <div id='homeMenu'>
          <ul>
            <li><a href={`${process.env.PUBLIC_URL}editorial`}>editorial</a></li>
            <li><a href={`${process.env.PUBLIC_URL}artwork`}>artwork</a></li>
            <li><a href={`${process.env.PUBLIC_URL}commercial`}>comercial</a></li>
            <li><a href={`${process.env.PUBLIC_URL}films`}>films</a></li>
            <li><a href={`${process.env.PUBLIC_URL}blog`}>blog</a></li>
            <li><a href={`${process.env.PUBLIC_URL}publications`}>publicaciones</a></li>
            <li><a href={`${process.env.PUBLIC_URL}about_me`}>sobre mi</a></li>
            <li><a href={`${process.env.PUBLIC_URL}contact`}>contacto</a></li>
          </ul>
        </div>
      </Banner>
  )
};

export { BannerContainer as Banner };