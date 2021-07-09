import styled from 'styled-components';

const Nav = styled.nav`
  .navWrapper {
    padding: 1.6rem 2.6rem;
    display: flex;
    flex-direction: row;
    .list {
      display: flex;
      ul {
        display: flex;
        flex-direction: row;
        list-style-type:none;
        padding-left: 0;
        margin: 0;
        li {
          margin-right: 3rem;
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
          }
        }
        li:last-child {
          margin-right: 0;
        }
      }
      .navOption {
        font-size: 2rem;
      }
    }
  }
  @media (min-width: 920px) {
    .navOption {
      font-size: 1.3rem !important;
    }
  }
`;

const AdminNav = ({edit, setEdit, deleteItem}) => {
  return (
    <Nav>
      <div className='navWrapper'>
        <div className='list'>
          <ul>
            <li><button className='navOption' onClick={() => setEdit(!edit)}>{edit ? 'Volver' : 'Editar'}</button></li>
            <li><button className='navOption' onClick={() => deleteItem()}>Eliminar</button></li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export { AdminNav };