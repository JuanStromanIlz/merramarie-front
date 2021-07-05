import styled from 'styled-components';

const Footer = styled.footer`
  border-top: 1px solid ${props => props.theme.colors.pink};
  padding-top: 2rem;
  .footerWrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    position: relative;
    padding: 2.6rem;
    display: flex;
    flex-direction: row;
  }
`;

const FooterComp = ({label}) => {
  return (
    <Footer>
      <div className='footerWrapper'>
        <ul>
          <li><a href={`${process.env.REACT_APP_FRONTEND + label}`}>Volver</a></li>
        </ul>
      </div>
    </Footer>
  );
}

export { FooterComp as Footer };