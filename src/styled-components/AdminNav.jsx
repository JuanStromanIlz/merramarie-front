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
            border: none;
            cursor: pointer;
            background: ${props => props.theme.colors.red};
            padding: .3rem 1rem;
            border-radius: 25px;
            box-shadow: 0 0 1px 1px ${props => props.theme.colors.pink};
            transition: .1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            span {
              text-decoration: none;
              text-transform: uppercase;
              display: block;
              font-size: 1.6rem;
              color: ${props => props.theme.colors.pink};
            }
          }
        }
        li:last-child {
          margin-right: 0;
        }
      }
      .navOption {
        font-size: 2rem;
        font-weight: 200;
      }
    }
  }
  @media (hover: hover) {
    button:hover {
      transform: scale(.9) !important;
    }
  }
  @media (min-width: 920px) {
    .navOption {
      font-size: 1.4rem !important;
    }
  }
`;

const AdminNav = ({edit, setEdit, deleteItem}) => {
  return (
    <Nav>
      <div className='navWrapper'>
        <div className='list'>
          <ul>
            <li>
              <button className='navOption' onClick={() => setEdit(!edit)}>
                <span>{edit ? 'Volver' : 'Editar'}</span>
              </button>
            </li>
            <li>
              <button className='navOption' onClick={() => deleteItem()}>
                <span>Eliminar</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export { AdminNav };