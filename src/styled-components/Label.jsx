import { useState } from 'react';
import styled from 'styled-components';
import { StickyTitle } from './StickyTitle';
import { EmptyCard } from './EmptyCard';

const Card = styled.div`
  cursor: pointer;
  display: inline-block;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  .mediaContainer {
    aspect-ratio: 7 / 4;
    margin-bottom: 1.5rem;
  }
  .mediaContainer__image {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .mediaContainer__video {
    position: relative;
    iframe {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index: -1;
    }
  }
  .cardInfo {
    span {
      color: ${props => props.theme.colors.red};
      text-transform: lowercase;
      font-size: 20px; 
    }
  }
  @media (min-width: 480px) {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
  }
  @media (min-width: 920px) {
    .cardInfo {
      span {
        font-size: 15px;
      }
    }
  }
`;

const Label = styled.div`
  .label__content {
    display: grid;
    grid-template-columns: repeat(1, auto);
  }
  .cardItem__blur {
    opacity: .3;
    transform: scale(.8);
  }
  .cardItem__select {
    transform: scale(1.1);
  }
  @media (min-width: 480px) {
    .label__content {
      grid-template-columns: repeat(2, calc(100% / 2)) !important;
    }
  }
  @media (min-width: 920px) {
    .label__content {
      grid-template-columns: repeat(4, calc(100% / 4)) !important;
    }
  }
`;

const LabelCard = ({item, sendTo, selectItem, isShow}) => {
  return (
    <Card className={`card__item ${isShow !== null && isShow !== item.route_title ? 'cardItem__blur' : isShow !== null && isShow === item.route_title ? 'cardItem__select' : '' }`} onClick={() => sendTo(item.route_title)} onMouseOver={() => selectItem(item.route_title)} onMouseLeave={() => selectItem(null)}>
      {item.images ? 
        <div className='mediaContainer mediaContainer__image'>
          <img src={item.images[0].url} alt={item.title}></img>
        </div>
      : item.videoLink ?
        <div className='mediaContainer mediaContainer__video'>
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
        <h1>{item.title}</h1>
        {item.category ?
          <span># {item.category}</span>
        : null}
      </div>
    </Card>
  );
};

const LabelView = ({name, label, sendTo}) => {
  const [isShow, setIsShow] = useState(null);

  function selectItem(name) {
    setIsShow(name)
  }

  return (
    <Label>
      <StickyTitle>{name}</StickyTitle>
      <div className='label__content'>
        {label.length === 0 ?
          <EmptyCard sendTo={sendTo}/>
        :
        label.map(item => 
          <LabelCard item={item} sendTo={sendTo} selectItem={selectItem} isShow={isShow} />
        )}
      </div>
    </Label>
  );
};

export {LabelView as Label};