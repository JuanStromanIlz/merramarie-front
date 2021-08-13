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
    window.document.title= 'Contacto | Merra Marie';
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