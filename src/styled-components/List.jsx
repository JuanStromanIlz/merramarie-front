import { useState } from 'react';
import styled from 'styled-components';
import { StickyTitle } from './StickyTitle';

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
        font-weight: 100;
      }
      h3 {
        text-transform: lowercase;
        font-weight: 200;
        color: ${props => props.theme.colors.green};
      }
    }
  }
  .item__blur {
    opacity: .3;
  }
  .item__select {
    color: ${props => props.theme.colors.green};
    h2 { 
      font-style: italic;
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

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListComponent = ({folder, sendTo}) => {
  const [isShow, setIsShow] = useState(null);

  function selectItem(name) {
    setIsShow(name)
  }

  return (
    <List>
      <StickyTitle>Publicaciones</StickyTitle>
      <div>
        {folder.map(item => 
          <Item
            onClick={() => sendTo(item.route_title, item.description)} 
            onMouseOver={() => selectItem(item.route_title)} 
            onMouseLeave={() => selectItem(null)}
          >
            <div className={`itemWrapper ${isShow !== null && isShow !== item.route_title ? 'item__blur' : isShow !== null && isShow === item.route_title ? 'item__select' : null}`}>
              <div className='icon'>
                <span className='material-icons'>link</span>
              </div>
              <div className='info'>
                <h2>{item.title}</h2>
                {item.category ?
                  <h3># {item.category}</h3>
                : null}
              </div>
            </div>
          </Item>
        )}
      </div>
    </List>
  );
};

export { ListComponent as List }