import styled from 'styled-components';
import { StickyTitle } from './StickyTitle';

const Item = styled.section`
  cursor: pointer;
  > div {
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin-bottom: 2.6rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        transform: rotate(90deg);
      }
    }
    h1 {
      margin-left: 1.6rem;
      text-transform: uppercase;
    }
  }
  :hover {
    color: ${props => props.theme.colors.green};
    font-style: italic;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemCard = ({item, sendTo}) => {
  function RedirectTo(title, location) {
    sendTo(title, location);
  }

  return (
    <Item onClick={() => RedirectTo(item.route_title, item.description)}>
      <div>
        <div>
          <span className='material-icons'>link</span>
        </div>
        <h1>{item.title}</h1>
      </div>
    </Item>
  );
};

const ListComponent = ({folder, sendTo}) => {
  return (
    <List>
      <StickyTitle>Publicaciones</StickyTitle>
      <div>
        {folder.map(item => 
          <ItemCard item={item} sendTo={sendTo} />
        )}
      </div>
    </List>
  );
};

export { ListComponent as List }