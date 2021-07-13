import styled from 'styled-components';

const Error = styled.div`
  padding: 2.6rem;
  width: 100%;
  height: 100%;
  span {
    margin-bottom: 1.6rem;
  }
`;

function ErrorView() {

  return (
    <Error>
      <span>Ocurrio un error</span>
      <a href={`${process.env.PUBLIC_URL}`}>Volver al home</a>
    </Error>
  );

};

export default ErrorView;