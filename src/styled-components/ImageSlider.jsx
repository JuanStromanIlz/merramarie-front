import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Slider = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1;
  margin: 0 !important;
  background: rgba(0,0,0, .97);
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    opacity: 0;
    width: 90%;
    height: 90%;
    object-fit: scale-down;
    transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  button {
    background: transparent;
    border: none;
    color: ${props => props.theme.colors.pink};
    opacity: .4;
    position: absolute;
    top: 0;
    bottom: 0;
    span {
      font-size: 4rem;
    }
  }
  .slide {
    z-index: 1;
    width: 30vw;
    max-width: 200px;
    span {
      visibility: hidden;
      border-radius: 50%;
      transition: .1s ease-in;
    }
    span:hover {
      transform: scale(1.8);
      color: ${props => props.theme.colors.red};
      opacity: 1;
    }
  }
  button.slide:hover {
    background-color: ${props => props.theme.colors.pink};
    opacity: .1;
  }
  .slide__left {
    left: 0;
  }
  .slide__right {
    right: 0;
  }
  .close:hover {
    opacity: 1;
  }
  .close {
    z-index: 2;
    height: fit-content !important;
    padding: 0;
    position: absolute;
    top: 1rem;
    right: 1rem;
    span:hover {
      transform: scale(.8);
      color: ${props => props.theme.colors.pink};
    }
  }
  @media(min-width: 920px) {
    button.slide {
      opacity: 1;
      span {
        visibility: visible;
      }
    }
    button.slide:hover {
      background-color: transparent;
      opacity: 1;
    }
  }
`;


const ImageSlider = ({images, singleImg, open, setOpen}) => {
  const [index, setIndex] = useState(singleImg);
  const [disable, setDisable] = useState(false);

  const slideRight = () => {
    setDisable(true);
    document.getElementById('imageToShow').style.opacity='0';
    setTimeout(() => {
      setIndex((index + 1) % images.length);
      document.getElementById('imageToShow').style.opacity='1';
      setDisable(false);
    }, 300);
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    setDisable(true);
    if (nextIndex < 0) {
      document.getElementById('imageToShow').style.opacity='0';
      setTimeout(() => {
        setIndex(images.length - 1);
        document.getElementById('imageToShow').style.opacity='1';
        setDisable(false);
      }, 300);
    } else {
      document.getElementById('imageToShow').style.opacity='0';
      setTimeout(() => {
        setIndex(nextIndex);
        document.getElementById('imageToShow').style.opacity='1';
        setDisable(true);
      }, 300);
    }
  };

  useEffect(() => {
    if (open) {
      setIndex(singleImg);
      document.getElementById('imageToShow').style.opacity='1';
      document.getElementById('imageSlider').style.display='flex';
      document.getElementById('root').style.cssText='position: fixed; inset: 0;';
    } else {
      document.getElementById('imageSlider').style.display='none';
      document.getElementById('root').removeAttribute('style');
    }
  }, [singleImg, open]);

  return (
    <Slider id='imageSlider'>
      <button className='close'>
        <span className='material-icons' onClick={() => setOpen(false)}>close</span>
      </button>
      <button className='slide slide__left' onClick={disable ? null : slideLeft}>
        <span className='material-icons'>chevron_left</span>
      </button>
      <img id='imageToShow' src={images[index].url} alt={index} />
      <button className='slide slide__right' onClick={disable ? null : slideRight}>
        <span className='material-icons'>chevron_right</span>
      </button>
    </Slider>
  );
}

export { ImageSlider };