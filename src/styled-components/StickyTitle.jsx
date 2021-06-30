import styled from 'styled-components';

const Title = styled.div`
  margin-bottom: 10rem;
  position: sticky;
  top: 70px;
  z-index: 1;
  transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  .header__title {
    font-size: 5.6rem;
    line-height: 5.6rem;
    -webkit-text-stroke: 2px ${props => props.theme.colors.red};
    color: transparent;
  }
  @media (min-width: 920px) {
    .header__title {
      font-size: 7.6rem;
      line-height: 7.6rem;
    }
  }
`;

const StickyTitle = ({children}) => (
  <Title className='header__floatTitle'>
    <header>
      <h1 className='header__title'>{children}</h1>
    </header>
  </Title>
);

export { StickyTitle };