import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  .footerWrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    ul {
      flex-basis: 100%;
      padding: 0 2.6rem 5.6rem 2.6rem;
      list-style-type:none;
      display: flex;
      flex-direction: row;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      li {
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
      li.first a:hover {
        transform: translateX(-20%);
      }
      li.last a:hover {
        transform: translateX(20%);
      }
    }
    .devInfo {
      flex-basis: 100%;
      padding: 0 2.6rem .6rem 2.6rem;
      span {
        color: rgba(127, 127, 127, .6);
      }
    }
  }
`;

const FooterComp = ({label, nextFolder}) => {
  const [adminRoutes, setAdminRoutes] = useState(false);

  useEffect(() => {
    let admin = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
  }, []);

  return (
    <Footer>
      <div className='footerWrapper'>
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
        <div className='devInfo'>
          <span>Juan Stroman Ilz</span>
        </div>
      </div>
    </Footer>
  );
}

export { FooterComp as Footer };