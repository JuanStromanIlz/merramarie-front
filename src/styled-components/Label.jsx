import styled from 'styled-components';
import { StickyTitle } from './StickyTitle';
import { EmptyCard } from './EmptyCard';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

const Card = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  background: ${props => props.theme.colors.red};
  aspect-ratio: 7 / 4;
  .mediaContainer {
    aspect-ratio: 7 / 4;
    position: relative;
    overflow: hidden;
    img, iframe {
      filter: brightness(.62);
    }
    img {
      filter: brightness(.62);
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    iframe {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      pointer-events: none;
    }
  }
  .cardInfo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.3rem;
    transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(1px);
    h2 {
      font-weight: 200;
    }
    h3 {
      text-transform: lowercase;
      font-weight: 100;
      color: ${props => props.theme.colors.green};
    }
  }
  .lazyload-wrapper {
    width: 100%;
    height: 100%;
    backdrop-filter: invert(5%);
  }
  @media (hover: hover) {
    :hover {
      img, iframe {
        filter: brightness(1);
      }
      img {
        transform: scale(1.1);
      }
      .cardInfo {
        opacity: 0;
      }
    }
  }
  @media (min-width: 480px) {
    :nth-child(odd) {
      margin-right: 1.3rem;
    }
    :nth-child(even) {
      margin-left: 1.3rem;
    }
  }
  @media (min-width: 920px) {
    .cardInfo {
      h2 {
        font-size: 4rem;
      }
      h3 {
        font-size: 2.1rem; 
      }
    }
  }
`;

const Label = styled.div`
  .label__content {
    display: grid;
    grid-template-columns: repeat(1, auto);
  }
  @media (min-width: 480px) {
    .label__content {
      grid-template-columns: repeat(2, calc(100% / 2)) !important;
    }
  }
`;

const LabelCard = ({item, adminRoutes}) => {
  return (
    <Link to={adminRoutes ? '/panel/folder/' + item.route_title : '/' + item.route_title} className='link'>
      <Card className='card__item'>
        {item.images ? 
          <div className='mediaContainer'>
            <LazyLoad once offset={400} resize={true}>
              <img src={item.images[0].url} alt={item.title}></img>
            </LazyLoad>
          </div>
        : item.videoLink ?
          <div className='mediaContainer'>
            <iframe 
              title={item.title} 
              src={item.videoLink} 
              frameborder="0" 
              allow="fullscreen; picture-in-picture" 
              allowfullscreen 
            ></iframe>
          </div>
        : null}
        <div className='cardInfo'>
          <h2>{item.title}</h2>
          {item.category ?
            <h3>#{item.category}</h3>
          : null}
        </div>
      </Card>
    </Link>
  );
};

const LabelView = ({name, label, adminRoutes}) => {

  return (
    <Label>
      <StickyTitle>{name}</StickyTitle>
      <div className='label__content'>
        {label.length === 0 ?
          <EmptyCard />
        :
        label.map(item => 
          <LabelCard item={item} adminRoutes={adminRoutes}/>
        )}
      </div>
    </Label>
  );
};

export {LabelView as Label};