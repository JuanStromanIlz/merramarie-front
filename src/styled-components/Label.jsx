import { useState } from 'react';
import styled from 'styled-components';
import { StickyTitle } from './StickyTitle';

const Card = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 1rem;
  transition: .1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
    }
  }
`;

const Label = styled.div`
  .label__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1f));
    grid-gap: 2rem;
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
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
    }
  }
  @media (min-width: 920px) {
    .label__content {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)) !important;
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
      : null }
      <div className='cardInfo'>
        <h1>{item.title}</h1>
        <span>{item.category}</span>
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
        {label.map(item => 
          <LabelCard item={item} sendTo={sendTo} selectItem={selectItem} isShow={isShow}/>
        )}
      </div>
    </Label>
  );
};

export {LabelView as Label};