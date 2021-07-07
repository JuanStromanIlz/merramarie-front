import styled from 'styled-components';

const Nav = styled.nav`
  .navWrapper {
    padding: 1.6rem 2.6rem 1.6rem 2.6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .list {
      display: flex;
      margin-left: auto;
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
            font-style: italic; 
          }
        }
        li:last-child {
          margin-right: 0;
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
            <li><button className='navOption' onClick={() => setEdit(!edit)}>{edit ? 'Volver' : 'Editar'}</button></li>
            <li><button className='navOption' onClick={() => deleteItem()}>Eliminar</button></li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export { AdminNav };