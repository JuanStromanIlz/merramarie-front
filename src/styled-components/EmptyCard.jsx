import styled from 'styled-components';

const Empty = styled.div`
  width: 100%;
  height: 100%;
  span {
    margin-bottom: 1.6rem;
  }
`;

const EmptyCard = () => (
  <Empty>
    <span>Ups! esta sección esta vacia.</span>
    <a href={`${process.env.REACT_APP_FRONTEND}`}>Volver al home</a>
  </Empty>
);

export { EmptyCard };