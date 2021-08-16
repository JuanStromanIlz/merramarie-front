import styled from 'styled-components';
import {
  FacebookShareButton, 
  FacebookIcon, 
  TwitterShareButton, 
  TwitterIcon,
  TumblrShareButton, 
  TumblrIcon,
  WhatsappShareButton, 
  WhatsappIcon
} from 'react-share';
import { useEffect } from 'react';

const Title = styled.div`
  padding-bottom: 2.3rem;
  top: 6rem;
  z-index: 1;
  transition: .8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  .header__title {
    font-size: 3rem;
    font-weight: 400;
    line-height: 3rem;
    -webkit-text-stroke: 2px ${props => props.theme.colors.red};
    color: transparent;
    overflow-wrap: break-word;
    pointer-events: none;
  }
  #mediaShare {
    height: 0;
    display: flex;
    flex-direction: row;
    transition: .8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(-500px);
    margin-left: -1rem;
    button {
      width: fit-content;
      svg {
        width: 45px;
      }
    }
  }
  @media (hover: hover) {
    button:hover {
      transform: scale(.8);
    }
  }
  @media (min-width: 920px) {
    top: 2.6rem;
    transform: translateX(0) !important;
    .header__title {
      font-size: 6rem;
      line-height: 6rem;
    }
  }
`;

const StickyTitle = ({isFolder, share, folder, children}) => {

  useEffect(() => {
    if (isFolder) {
      document.getElementsByClassName('header__floatTitle')[0].style.position='sticky';
      if (share) {
        document.getElementById('mediaShare').style.cssText='transform: translateX(0); height: 50px;';
      } 
    }
  }, [share, isFolder]);

  return (
    <Title className='header__floatTitle'>
      <header>
        <h1 className='header__title'>{children}</h1>
        {isFolder ?
          <div id='mediaShare'>
            <div>
              <FacebookShareButton
                url={`${process.env.PUBLIC_URL}/${folder.label}/${folder.route}`}
                quote={folder.title}
              >
                <FacebookIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </FacebookShareButton>
            </div>
            <div>
              <TwitterShareButton
                url={`${process.env.REACT_APP_FRONTEND}/${folder.label}/${folder.route}`}
                title={folder.title}
              >
                <TwitterIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </TwitterShareButton>
            </div>
            <div>
              <TumblrShareButton
                url={`${process.env.REACT_APP_FRONTEND}/${folder.label}/${folder.route}`}
                title={folder.title}
              >
                <TumblrIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </TumblrShareButton>
            </div>
            <div>
              <WhatsappShareButton
                url={`${process.env.REACT_APP_FRONTEND}/${folder.label}/${folder.route}`}
                title={folder.title}
              >
                <WhatsappIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </WhatsappShareButton>
            </div>
          </div>
        : null}
      </header>
    </Title>
  );
};

export { StickyTitle };