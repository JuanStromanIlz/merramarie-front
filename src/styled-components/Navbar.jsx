import {useState} from 'react';
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
        > span {
          display: block;
          color: ${props => props.theme.colors.red};
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
    .navOption {
      font-size: 20px;
    }
    .homeTag {
      color: ${props => props.theme.colors.red} !important;
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
      document.getElementsByClassName('header__floatTitle')[0].classList.add('titleSlice__open');
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuSlice__open');
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuIsOpen');
      document.getElementsByClassName('nav__mask')[0].classList.add('menuSlice__open');
      document.getElementsByClassName('nav__mask')[0].classList.add('menuIsOpen');
      setTimeout(() => {
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__open');
        document.getElementsByClassName('nav__mask')[0].classList.remove('menuSlice__open');
      }, 1000);
      setMenu(true);
    } else {
      document.getElementsByClassName('header__floatTitle')[0].classList.add('titleSlice__close');
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuSlice__close');
      document.getElementsByClassName('nav__mask')[0].classList.add('menuSlice__close');
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

  return (
    <Navbar>
      <div className='navWrapper'>
        <div className='nav__mask'></div>
        <div className='list'>
          <ul>
            <li><a className='navOption homeTag' href={`${process.env.REACT_APP_FRONTEND}`}>home</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/editorial`}>editorial</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/artwork`}>artwork</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/commercial`}>commercial</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/films`}>films</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/exhibitions`}>exhibitions</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/publications`}>publications</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/about_me`}>about me</a></li>
            <li><a className='navOption' href={`${process.env.REACT_APP_FRONTEND}/contact`}>contact</a></li>
          </ul>
        </div>
        <div className='hamburgerMenu'>
          <button onClick={() => openMenu()}>
            <span className='material-icons navOption'>add</span>
          </button>
        </div>
        <div className='hamburger'>
          <div className='hamburger__slice'>
            <div>
              <ul>
                <li><a className='homeTag' href={`${process.env.REACT_APP_FRONTEND}`}>home</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/editorial`}>editorial</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/artwork`}>artwork</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/commercial`}>commercial</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/films`}>films</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/exhibitions`}>exhibitions</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/publications`}>publications</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/about_me`}>about me</a></li>
                <li><a href={`${process.env.REACT_APP_FRONTEND}/contact`}>contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export {Nav};