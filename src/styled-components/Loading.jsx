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
  ${'' /* .loadingAnimation div {
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    border: 4px solid ${props => props.theme.colors.red};
    opacity: 1;
    border-radius: 50%;
    animation: loading 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .loadingAnimation div:nth-child(2) {
    animation-delay: -0.5s;
  } */}
  ${'' /* img {
    animation: loading 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
  } */}
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
  @keyframes loading {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;
const LoadingIcon = () => {
  return (
    <Loading>
      <img src={process.env.PUBLIC_URL + '/icon.svg'} alt='loading'></img>
    </Loading>
    // <Loading><div className='loadingAnimation'><div></div><div></div></div></Loading>
  );
}
export {LoadingIcon as Loading};