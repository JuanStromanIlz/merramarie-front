import { StickyTitle } from "../styled-components/StickyTitle";
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
    display: flex;
    flex-direction: row;
    gap: 2.6rem;
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
            <span>Red</span>
            <a href='/'>link</a>
          </li>
          <li>
            <span>Red</span>
            <a href='/'>link</a>
          </li>
          <li>
            <span>Red</span>
            <a href='/'>link</a>
          </li>
          <li>
            <span>Red</span>
            <a href='/'>link</a>
          </li>
        </Contact>
      </Wrapper>
    </>
  );
};

export default AboutMe;