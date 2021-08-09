import styled from 'styled-components';
import { StickyTitle } from './StickyTitle';
import { EmptyCard } from './EmptyCard';
import { Link } from 'react-router-dom';

const Item = styled.section`
  cursor: pointer;
  margin-bottom: 2.6rem;
  width: fit-content;
  .itemWrapper {
    display: flex;
    flex-direction: row;
    width: fit-content;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        transform: rotate(90deg);
      }
    }
    .info {
      padding-left: 1.6rem;
      h2 {
        font-weight: 200;
      }
      h3 {
        text-transform: lowercase;
        font-weight: 100;
        color: ${props => props.theme.colors.green};
      }
    }
  }
  @media (hover: hover) {
    .itemWrapper:hover {
      color: ${props => props.theme.colors.green};
      h2 { 
        font-style: italic;
      }
    }
  }
  @media (min-width: 920px) {
    .info {
      h2 {
        font-size: 4rem;
      }
      h3 {
        font-size: 2.1rem; 
      }
    }
  }
`;

const LinkItem = ({item, adminRoutes}) => {
  return (
    adminRoutes ? 
    <Link to={`/panel/folder/${item.route_title}`} className='link'>
      <Item>
        <div className='itemWrapper'>
          <div className='icon'>
            <span className='material-icons'>link</span>
          </div>
          <div className='info'>
            <h2>{item.title}</h2>
            {item.category ?
              <h3>#{item.category}</h3>
            : null}
          </div>
        </div>
      </Item>
    </Link>
    :
    <a href={item.description} target='_blank' rel='noreferrer' className='link'>
      <Item>
        <div className='itemWrapper'>
          <div className='icon'>
            <span className='material-icons'>link</span>
          </div>
          <div className='info'>
            <h2>{item.title}</h2>
            {item.category ?
              <h3>#{item.category}</h3>
            : null}
          </div>
        </div>
      </Item>
    </a>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListComponent = ({folder, adminRoutes}) => {
  return (
    <List>
      <StickyTitle>Publicaciones</StickyTitle>
      <div>
        {folder.length === 0 ?
          <EmptyCard />
          : 
          folder.map(item => <LinkItem item={item} adminRoutes={adminRoutes} />)}
      </div>
    </List>
  );
};

export { ListComponent as List }