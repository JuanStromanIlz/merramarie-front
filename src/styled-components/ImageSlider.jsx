import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Slider = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1;
  margin: 0 !important;
  background: rgba(0,0,0, .8);
  justify-content: space-around;
  align-items: center;
  outline: none;
  .imgContainer {
    position: relative;
    width: 100%;
    height: 100%;
    .slider {
      opacity: 0;
      position: absolute;
      inset: 0;
      display: flex;
      transition: .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      img {
        object-fit: scale-down;
        width: 90%;
        height: 90%;
        display: flex;
        margin: auto;
      }
    }
    .slider__show {
      opacity: 1;
    }
  }
  button {
    background: transparent;
    border: none;
    color: ${props => props.theme.colors.pink};
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .slide {
    display: none;
    place-items: center;
    z-index: 1;
    width: 30vw;
    max-width: 200px;
    span {
      visibility: hidden;
      border-radius: 50%;
      border: 2px solid ${props => props.theme.colors.pink};
      -webkit-text-stroke: 2px ${props => props.theme.colors.pink};
      color: transparent;
      font-size: 6rem;
      transition: .1s ease-in;
    }
  }
  .slide__left {
    left: 0;
  }
  .slide__right {
    right: 0;
  }
  .close {
    z-index: 2;
    height: fit-content !important;
    padding: 0;
    position: absolute;
    top: 1rem;
    right: 1rem;
    span {
      font-size: 3rem;
      color: ${props => props.theme.colors.pink};
    }
  }
  .list {
    position: absolute;
    bottom: 1.3rem;
    width: 100%;
    z-index: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 1.2rem;
    .listItem {
      cursor: pointer;
      border-radius: 25px;
      padding: .4rem;
      background: transparent;
      border: 1px solid ${props => props.theme.colors.pink};
      margin: 0 .3rem;
      transition: .5s;
    }
    .listItem__active {
      background: ${props => props.theme.colors.red};
      box-shadow: 0 0 10px 4px ${props => props.theme.colors.red};
    }
  }
  @media (hover: hover) {
    .slide span:hover {
      transform: scale(1.2);
      border: 2px solid ${props => props.theme.colors.red};
      -webkit-text-stroke: 2px ${props => props.theme.colors.red};
    }
    .close:hover {
      opacity: 1;
      span {
        color: ${props => props.theme.colors.red};
      }
    }
  }
  @media(min-width: 920px) {
    button.slide {
      opacity: 1;
      display: grid;
      span {
        visibility: visible;
      }
    }
    .listItem {
      padding: .6rem !important;
    }
  }
`;


const ImageSlider = ({images, singleImg, open, setOpen}) => {
  const [index, setIndex] = useState([]);
  const [indexCard, setIndexCard] = useState(0);
  const [touchStartPoint, setTouchStartPoint] = useState(0);
  const [moveDirection, setMoveDirection] = useState(true);

  /* Touch */
  function touchStart(e) {
    setTouchStartPoint(e.changedTouches[0].clientX);
  }
  function touchMove(e) {
    setMoveDirection(e.changedTouches[0].clientX < touchStartPoint);
  }
  function touchEnd() {
    let lastCard = indexCard + 1;
    setTimeout(()=> {
      if (moveDirection) {
        if (lastCard < index.length) {
          setIndexCard(indexCard +1);
        }
        if (lastCard === index.length) {
          setIndexCard(0);
        }
      } else if(!moveDirection && indexCard > 0) {
        setIndexCard(indexCard -1);
      }
    }, 250);
  }

  /* Keys */
  function keyPress(e) {
    if (e.keyCode === 39 || e.keyCode === 40) {
      buttonRight();
    }
    if (e.keyCode === 37 || e.keyCode === 38) {
      buttonLeft();
    }
  }

  /* Buttons */
  function buttonLeft() {
    if (indexCard > 0) {
      setIndexCard(indexCard -1);
    }
  }

  function buttonRight() {
    let lastCard = indexCard + 1;
    if (lastCard < index.length) {
      setIndexCard(indexCard +1);
    }
    if (lastCard === index.length) {
      setIndexCard(0);
    }
  }

  useEffect(() => {
    setIndex(images);
    setIndexCard(singleImg);
    if (open) {
      document.getElementById('imageSlider').style.display='flex';
      document.getElementById('imageSlider').focus();
      document.body.style.overflow='hidden';
    } else {
      document.getElementById('imageSlider').style.display='none';
      document.body.removeAttribute('style');
    }
  }, [open, images, singleImg]);

  return (
    <Slider 
      id='imageSlider'
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
      onKeyDown={keyPress}
      tabIndex={0}
    >
      <button className='close'>
        <span className='material-icons' onClick={() => setOpen(false)}>close</span>
      </button>
      <button className='slide slide__left' onClick={buttonLeft}>
        <span className='material-icons'>chevron_left</span>
      </button>
      <div className='imgContainer'>
        {index.map((img, i) => 
          <div className={`slider  ${indexCard === i ? 'slider__show' : null}`}>
          <img src={img.url} alt='folder'></img>
          </div>
        )}
      </div>
      {/* <img id='imageToShow' src={images[index].url} alt={index} /> */}
      <button className='slide slide__right' onClick={buttonRight}>
        <span className='material-icons'>chevron_right</span>
      </button>
      <div className='list'>
        {index.map((item, i) => 
          <div className={`listItem ${indexCard === i ? 'listItem__active' : null}`}></div>
        )}
      </div>
    </Slider>
  );
}

export { ImageSlider };