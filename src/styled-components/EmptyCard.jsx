import styled from 'styled-components';

const Empty = styled.div`

`;

const EmptyCard = () => (
  <Empty>
    <span>No hay info todavia</span>
  </Empty>
);

export { EmptyCard };