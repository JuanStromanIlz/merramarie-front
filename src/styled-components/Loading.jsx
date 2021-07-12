import styled from 'styled-components';

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  .loadingAnimation {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    background: red;
  }
  img {
    width: 25vw;
    display: block;
    position: absolute;
    inset: 0;
    margin: auto;
    animation: sun 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes sun {
    0% {
      transform: rotate(0deg);
      opacity: .3;
    }
    100% {
      transform: rotate(360deg);
      opacity: 1;
    }
  }
`;
const LoadingIcon = () => {
  return (
    <Loading>
      <img src={process.env.PUBLIC_URL + '/icon.svg'} alt='loading'></img>
    </Loading>
  );
}
export {LoadingIcon as Loading};