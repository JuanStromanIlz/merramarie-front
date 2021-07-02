import styled from 'styled-components';

const Nav = styled.nav`
  .navWrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    position: relative;
    padding: 2.6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .list {
      display: flex;
      margin-right: auto;
      ul {
        display: flex;
        flex-direction: row;
        list-style-type:none;
        padding-left: 0;
        margin: 0;
        li {
          margin: auto 3rem auto auto;
          button {
            background: transparent;
            border: none;
            padding: 0;
            color: ${props => props.theme.colors.pink};
            text-decoration: none;
            text-transform: uppercase;
          }
          button:hover {
            color: ${props => props.theme.colors.red};
            font-style: italic; 
          }
        }
      }
      .navOption {
      font-size: 20px;
    }
    }
  }
  @media (min-width: 920px) {
    .navOption {
      font-size: 12px !important;
    }
  }
  @media (min-width: 1200px) {
    .navOption {
      font-size: 15px !important;
    }
  }
`;

const AdminNav = ({edit, setEdit, deleteItem}) => {
  return (
    <Nav>
      <div className='navWrapper'>
        <div className='list'>
          <ul>
            <li><button className='navOption' onClick={() => setEdit(!edit)}>Editar</button></li>
            <li><button className='navOption' onClick={() => deleteItem()}>Eliminar</button></li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export { AdminNav };