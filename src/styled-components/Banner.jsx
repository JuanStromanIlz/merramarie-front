import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Loading } from './Loading';
import { Link } from 'react-router-dom';

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
  const [imageShow, setimageShow] = useState(null);

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
        let img = Math.floor(Math.random() * (urls.length + 1));
        setimageShow(urls[img]);
        setLoading(false);
        window.addEventListener('mousemove', onMouseMove);
        setTimeout(() => {
          let showImgs = document.getElementsByTagName('img');
          for (let i = 0; i < showImgs.length; i++) {
            document.getElementsByTagName('img')[i].style.opacity='1';
          }
        }, 700);
      }
    }
    getInfo();
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  return (
    loading ?
    <Loading />
    : 
      <Banner>
        <div id='cortina' onClick={openHome}>
          {imageShow === null ?
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
            <li><Link to='/editorial' className='link'>editorial</Link></li>
            <li><Link to='/artwork' className='link'>artwork</Link></li>
            <li><Link to='/commercial' className='link'>comercial</Link></li>
            <li><Link to='/films' className='link'>films</Link></li>
            <li><Link to='/blog' className='link'>blog</Link></li>
            <li><Link to='/publications' className='link'>publicaciones</Link></li>
            <li><Link to='/about_me' className='link'>sobre mi</Link></li>
            <li><Link to='/contact' className='link'>contacto</Link></li>
          </ul>
        </div>
      </Banner>
  )
};

export { BannerContainer as Banner };