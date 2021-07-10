import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  .footerWrapper {
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    > div {
      border-top: 1px solid ${props => props.theme.colors.pink};
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
          a {
            color: ${props => props.theme.colors.pink};
            text-decoration: none;
            text-transform: uppercase;
            display: block;
            font-weight: 200;
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
    a:hover {
      color: black !important;
    }
  }
  @media (min-width: 920px) {
    h3 {
      font-size: 1.4rem !important;
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
    } else {
      document.getElementsByClassName('footerEnd')[0].style.boxShadow='';
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
              <a href={`${process.env.REACT_APP_FRONTEND + label}`}>
                <h3>Volver</h3>
              </a>
            </li>
            {nextFolder ? 
              <li className='last'>
                <a href={`${adminRoutes ? process.env.REACT_APP_FRONTEND + `${'panel/folder/' + nextFolder}` : process.env.REACT_APP_FRONTEND + nextFolder}`}>
                  <h3>Siguiente</h3>  
                </a>
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