import {useEffect, useState} from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  .navWrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    position: relative;
    padding: 2.6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    h1 {
      text-transform: uppercase;
      -webkit-text-stroke: 2px ${props => props.theme.colors.pink};
      color: transparent;
    }
    .list {
      display: flex;
      margin-right: auto;
      ul {
        display: flex;
        flex-direction: row;
        list-style-type:none;
        padding-left: 0;
        margin: 0;
        li {
          display: none;
          margin: auto 3rem auto auto;
          a {
            color: ${props => props.theme.colors.pink};
            text-decoration: none;
            text-transform: uppercase;
            display: block;
          }
          a:hover {
            color: ${props => props.theme.colors.red};
            font-style: italic; 
          }
        } 
        li:last-child {
          margin-right: 0;
        }
        li:first-child {
          display: block;
        }
      }
    }
    .hamburgerMenu {
      margin: auto 0 auto auto;
      button {
        background: transparent;
        border: none;
        color: white;
        display: flex;
        position: relative;
        > span {
          position: absolute;
          left: 50%;
          margin-left: -17.5px;
          top: 50%;
          margin-top: -17.5px;
          font-size: 35px;
          display: block;
          color: ${props => props.theme.colors.red};
          transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      }
    }
    .hamburger {
      .hamburger__slice {
        position: fixed;
        height: calc(100% - 75px);
        top: 75px;
        left: 0px;
        right: 0px;
        width: 100vw;
        overflow: auto;
        display: none;
        padding-right: 2.6rem;
        ul {
          list-style-type:none;
          padding-left: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          li {
            align-self: flex-end;
            a {
              color: ${props => props.theme.colors.pink};
              text-decoration: none;
              text-transform: uppercase;
              display: block;
              font-size: 20px;
              margin-bottom: 5px;
            }
            a:hover {
              color: ${props => props.theme.colors.red};
              font-style: italic; 
            }
          }
          li:last-child a {
            margin-bottom: 0;
          }
        }
      }
    }
    .navOption {
      font-size: 20px;
    }
    .homeTag {
      color: ${props => props.theme.colors.red} !important;
    }
  }
  /* HAMBURGER ANIMATIONS */
  .nav__mask {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    display: none;
    background-color: rgba(0, 0, 0, .7);
  }
  .menuIsOpen {
    display: block !important;
  }
  .iconRotate__open {
    transform: rotate(45deg);
  }
  .menuSlice__open {
    animation: menuOpen 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    @keyframes menuOpen {
      0% { 
        opacity: 0; 
      }
      100% { 
        opacity: 1; 
      }
    }
  }
  .menuSlice__close {
    animation: menuClose 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    @keyframes menuClose {
      0% { 
        opacity: 1; 
      }
      100% { 
        opacity: 0; 
      }
    }
  }
  @media (min-width: 920px) {
    position: relative;
    .list ul li {
      display: block !important;
    }
    .hamburgerMenu {
      display: none !important;
    }
    .navOption {
      font-size: 12px !important;
    }
  }
  @media (min-width: 1200px) {
    .navOption {
      font-size: 15px !important;
    }
  }
`;

const Nav = () => {
  const [menu, setMenu] = useState(false);
  function openMenu() {
    if (!menu) {
      // Remove the title in the page
      document.getElementsByClassName('header__floatTitle')[0].style.transform='translateX(-500px)';
      // Make the cards no click
      let cards = document.getElementsByClassName('card__item');
      if (cards) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.add('noClick');
        }
      }
      // Check for folder videos
      let folder = document.getElementsByClassName('folder__item')[0];
      if (folder) {
        let folderVideo = folder.getElementsByTagName('iframe')[0];
        if (folderVideo) {    
          folderVideo.classList.add('noClick'); 
        }
      }
      // Animations for open the menu
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuSlice__open');
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuIsOpen');
      document.getElementsByClassName('nav__mask')[0].classList.add('menuSlice__open');
      document.getElementsByClassName('nav__mask')[0].classList.add('menuIsOpen');
      document.getElementById('menuIcon').classList.add('iconRotate__open');
      setTimeout(() => {
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__open');
        document.getElementsByClassName('nav__mask')[0].classList.remove('menuSlice__open');
      }, 1000);
      setMenu(true);
    } else {
      // Put back the page title
      document.getElementsByClassName('header__floatTitle')[0].style.transform='';
      // Remove z-index from iframe 

      // Remove the cards no click
      let cards = document.getElementsByClassName('card__item');
      if (cards) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove('noClick');
        }
      }
      // Check for folder videos
      let folder = document.getElementsByClassName('folder__item')[0];
      if (folder) {
        let folderVideo = folder.getElementsByTagName('iframe')[0];
        if (folderVideo) {    
          folderVideo.classList.remove('noClick'); 
        }
      }
        // Animations for close the menu
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuSlice__close');
      document.getElementsByClassName('nav__mask')[0].classList.add('menuSlice__close');
      document.getElementById('menuIcon').classList.remove('iconRotate__open');
      setTimeout(() => {
        document.getElementsByClassName('header__floatTitle')[0].classList.remove('titleSlice__open');
        document.getElementsByClassName('header__floatTitle')[0].classList.remove('titleSlice__close');
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__close');
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuIsOpen');
        document.getElementsByClassName('nav__mask')[0].classList.remove('menuSlice__close');
        document.getElementsByClassName('nav__mask')[0].classList.remove('menuIsOpen');
      }, 1000);
      setMenu(false);
    }
  }

  useEffect(() => {
    if (window.innerWidth > 920 && menu) {
      openMenu();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, menu]);

  return (
    <Navbar>
      <div className='navWrapper'>
        <div className='nav__mask'></div>
        <div className='list'>
          <ul>
            <li><a className='navOption homeTag' href={`${process.env.REACT_APP_FRONTEND}`}>home</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}editorial`}>editorial</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}artwork`}>artwork</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}commercial`}>commercial</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}films`}>films</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}exhibitions`}>exhibitions</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}publications`}>publications</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}about_me`}>about me</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}contact`}>contact</a></li>
          </ul>
        </div>
        <div className='hamburgerMenu'>
          <button onClick={() => openMenu()}>
            <span id='menuIcon' className='material-icons navOption'>add</span>
          </button>
        </div>
        <div className='hamburger'>
          <div className='hamburger__slice'>
            <div>
              <ul>
                <li><a className='homeTag' href={`${process.env.REACT_APP_FRONTEND}`}>home</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}editorial`}>editorial</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}artwork`}>artwork</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}commercial`}>commercial</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}films`}>films</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}exhibitions`}>exhibitions</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}publications`}>publications</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}about_me`}>about me</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}contact`}>contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export {Nav};