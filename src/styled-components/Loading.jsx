import styled from 'styled-components';

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  .loadingAnimation {
    display: inline-block;
    position: relative;
    width: 80 px;
    height: 80 px;
  }
  .loadingAnimation div {
    ${'' /* position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px; */}
    border: 4px solid ${props => props.theme.colors.red};
    opacity: 1;
    border-radius: 50%;
    animation: loading 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .loadingAnimation div:nth-child(2) {
    animation-delay: -0.5s;
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
    <Loading><div className='loadingAnimation'><div></div><div></div></div></Loading>
  );
}
export {LoadingIcon as Loading};