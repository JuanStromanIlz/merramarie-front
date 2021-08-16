import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = styled.footer`
  .footerWrapper {
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    > div {
      border-top: 1px solid ${props => props.theme.colors.red};
      padding-top: 2.6rem;
      h3 {
        font-size: 20px;
      }
      ul {
        flex-basis: 100%;
        list-style-type:none;
        display: flex;
        flex-direction: row;
        margin: 0;
        padding: 0;
        padding-bottom: 2.6rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
          background: ${props => props.theme.colors.red};
          padding: .3rem 1rem;
          border-radius: 25px;
          box-shadow: 0 0 1px 1px ${props => props.theme.colors.pink};
          transition: .1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          a {
            text-decoration: none;
            text-transform: uppercase;
            display: block;
            color: ${props => props.theme.colors.pink};
          }
        }
      }
    }
  }
  .footerEnd {
    border-radius: 50%;
    overflow:hidden;
    transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 -10px 10rem 6rem rgba(189, 41, 41, .7);
  }
  @media (hover: hover) {
    li:hover {
      transform: scale(.9);
    }
  }
  @media (min-width: 920px) {
    h3 {
      font-size: 1.4rem !important;
    }
    li {
      box-shadow: 0 0 1px 1px transparent;
    }
    .footerEnd {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

const FooterComp = ({label, nextFolder}) => {
  const [adminRoutes, setAdminRoutes] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
    if (footer) {
      document.getElementsByClassName('footerEnd')[0].style.boxShadow='0 -10px 10rem 6rem rgba(189, 41, 41, .7)';
      let buttons = document.getElementById('footer').getElementsByTagName('li');
      for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.style.boxShadow='0 0 1px 1px #f2d5d5';
      }
    } else {
      document.getElementsByClassName('footerEnd')[0].style.boxShadow='';
      let buttons = document.getElementById('footer').getElementsByTagName('li');
      for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.removeAttribute('style');
      }
    }
    const onScroll = () => {
      setFooter((window.innerHeight + window.scrollY) >= document.body.offsetHeight);
    }; 
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [footer]);

  return (
    <Footer>
      <div id='footer' className='footerWrapper'>
        <div>
          <ul>
            <li className='first'>
              <Link to={`/${label}`} className='link'>
                <h3>Volver</h3>
              </Link>
            </li>
            {nextFolder ? 
              <li className='last'>
                <Link to={adminRoutes ? `/panel/folder/${label}/${nextFolder.route_title}` : `/folder/${label}/${nextFolder.route_title}`} className='link'>
                  <h3>Siguiente</h3>  
                </Link>
              </li>
            : null}
          </ul>
        </div>
      </div>
      <div className='footerEnd'></div>
    </Footer>
  );
}

export { FooterComp as Footer };