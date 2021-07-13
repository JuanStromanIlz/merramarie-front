import { StickyTitle } from '../styled-components/StickyTitle';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';
import styled from 'styled-components';

const Contact = styled.ul`
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

function AboutMe() {
  return (
    <>
      <Nav />
      <Wrapper>
        <StickyTitle>Contacto</StickyTitle>
        <Contact>
          <li>
            <span>Mail: <a href='mailto:muchutmaria@gmail.com' target='_blank'>muchutmaria@gmail.com</a></span>  
          </li>
          <li>
            <span>Instagram: <a href='https://www.instagram.com/zvldlz/' target='_blank'>@zvldlz</a></span>
          </li>
          <li>
            <span>Tumblr: <a href='https://peroquepena.tumblr.com/' target='_blank'>peroquepena.tumblr.com</a></span>
          </li>
        </Contact>
      </Wrapper>
    </>
  );
};

export default AboutMe;