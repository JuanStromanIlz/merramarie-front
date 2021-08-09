import { Link } from 'react-router-dom';
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
      <Link to='/' className='link'>Volver al home</Link>
    </Error>
  );

};

export default ErrorView;