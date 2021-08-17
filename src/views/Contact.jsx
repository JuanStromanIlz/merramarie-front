import { useEffect } from 'react';
import { StickyTitle } from '../styled-components/StickyTitle';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';
import styled from 'styled-components';

const ContactContainer = styled.ul`
  list-style-type:none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  li {
    a:hover {
      text-decoration: underline;
    }
  }
`;

function Contact() {

  useEffect(() => {
    /* og:type */
    window.document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
    /* og:title */
    window.document.querySelector('meta[property="og:title"]').setAttribute("content", 'Contacto | Merra Marie');
    window.document.querySelector('meta[name="twitter:title"]').setAttribute("content", 'Contacto | Merra Marie');
    window.document.title= 'Contacto | Merra Marie';
    /* og:description */
    window.document.querySelector('meta[name="description"]').setAttribute("content", 'Desde Argentina con amor.');
    window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Desde Argentina con amor.');
    /* og:url */
    window.document.querySelector('meta[property="og:url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/about_me`);
    /* og:images default */
    window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
  }, []);

  return (
    <>
      <Nav />
      <Wrapper>
        <StickyTitle>Contacto</StickyTitle>
        <ContactContainer>
          <li>
            <span>Mail: <a href='mailto:muchutmaria@gmail.com' target='_blank' rel='noreferrer'>muchutmaria@gmail.com</a></span>  
          </li>
          <li>
            <span>Instagram: <a href='https://www.instagram.com/zvldlz/' target='_blank' rel='noreferrer'>@zvldlz</a></span>
          </li>
          <li>
            <span>Tumblr: <a href='https://peroquepena.tumblr.com/' target='_blank' rel='noreferrer'>peroquepena.tumblr.com</a></span>
          </li>
        </ContactContainer>
      </Wrapper>
    </>
  );
};

export default Contact;