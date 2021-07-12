import styled from 'styled-components';

const About = styled.div`
  overflow: hidden;
  min-height: calc(100vh - 107px);
  #infoWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 920px) {
    #infoWrapper {
      flex-direction: row;
    }
    .text {
      max-width: 60%;
    }
  }
`;

export { About };