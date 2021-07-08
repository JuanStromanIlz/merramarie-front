import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgba(0,0,0,0.8);
  box-shadow: 0 2px 5px 5px rgb(0, 0, 0, .7);
  .navWrapper {
    position: relative;
    padding: 1rem 2.6rem;
    display: flex;
    flex-direction: row;
    h1 {
      text-transform: uppercase;
      -webkit-text-stroke: 2px ${props => props.theme.colors.pink};
      color: transparent;
    }
    .list {
      display: flex;
      align-items: center;
      margin-right: auto;
      flex-basis: 100%;
      ul {
        display: flex;
        flex-basis: 100%;
        flex-direction: row;
        list-style-type:none;
        padding-left: 0;
        margin: 0;
        li {
          display: none;
          margin: 0 3rem 0 0;
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
        height: calc(100% - 55px);
        top: 55px;
        left: 0px;
        right: 0px;
        width: 100vw;
        overflow: auto;
        display: none;
        padding-top: 2.6rem;
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
              margin-bottom: 1.6rem;
            }
            a:hover {
              color: ${props => props.theme.colors.red};
              font-style: italic; 
            }
          }
          li:last-child a {
            margin-top: 3.2rem;
            margin-bottom: 0;
          }
        }
      }
    }
    .navOption {
      font-size: 20px;
    }
    .homeTag {
      margin-right: 1.6rem;
      a {
        display: flex;
      }
    }
    .log {
      a {
        color: ${props => props.theme.colors.red} !important;
      }
    }
    .new { 
      a {
        color: ${props => props.theme.colors.green} !important;
      }
    }
    .logTag:nth-child(odd) {
      margin-left: auto !important;
      margin-right: 0 !important;
    }
    .logTag:nth-child(2n) {
      margin-left: 3rem !important;
    }
  }
  /* HAMBURGER ANIMATIONS */
  .menuIsOpen {
    display: block !important;
    background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 36%);
    border-top: 1px solid ${props => props.theme.colors.pink};
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
    position: inherit;
    .navWrapper {
      background-color: transparent !important;
    }
    .list ul li {
      display: block !important;
    }
    .hamburger {
      display: none !important;
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
  const [adminRoutes, setAdminRoutes] = useState(false);
  function openMenu() {
    if (!menu) {
      // Remove the title in the page
      document.getElementsByClassName('header__floatTitle')[0].style.transform='translateX(-200%)';
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
      document.getElementById('menuIcon').classList.add('iconRotate__open');
      setTimeout(() => {
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__open');
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
      document.getElementById('menuIcon').classList.remove('iconRotate__open');
      setTimeout(() => {
        document.getElementsByClassName('header__floatTitle')[0].classList.remove('titleSlice__open');
        document.getElementsByClassName('header__floatTitle')[0].classList.remove('titleSlice__close');
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__close');
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuIsOpen');
      }, 1000);
      setMenu(false);
    }
  }

  useEffect(() => {
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
  }, []);

  return (
    <Navbar>
      <div className='navWrapper'>
        <div className='homeTag'>
          <a className='homeTag' href={`${process.env.REACT_APP_FRONTEND}`}>
            <img src={process.env.PUBLIC_URL + '/icon.svg'} alt='home'></img>
          </a>
        </div>
        <div className='list'>
          <ul>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}editorial`}>editorial</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}artwork`}>artwork</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}commercial`}>comercial</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}films`}>films</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}exhibitions`}>exhibiciones</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}publications`}>publicaciones</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}about_me`}>sobre mi</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}contact`}>contacto</a></li>
            {adminRoutes && <li className='logTag new'><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}panel/new`}>nuevo</a></li>}
            <li className='logTag log'><a className='navOption' href={`${adminRoutes ? process.env.REACT_APP_FRONTEND + 'panel/log_out' : process.env.REACT_APP_FRONTEND + 'panel/log_in'}`}>{adminRoutes ? 'log out' : 'log in'}</a></li>
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
                <li><a href={`${process.env.REACT_APP_FRONTEND}editorial`}>editorial</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}artwork`}>artwork</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}commercial`}>comercial</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}films`}>films</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}exhibitions`}>exhibiciones</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}publications`}>publicaciones</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}about_me`}>sobre mi</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}contact`}>contacto</a></li>
                {adminRoutes && <li className='new'><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}panel/new`}>nuevo</a></li>}
                <li className='log'><a href={`${adminRoutes ? process.env.REACT_APP_FRONTEND + 'panel/log_out' : process.env.REACT_APP_FRONTEND + 'panel/log_in'}`}>{adminRoutes ? 'log out' : 'log in'}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export {Nav};