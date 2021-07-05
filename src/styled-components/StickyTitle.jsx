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
  margin-bottom: 10rem;
  position: sticky;
  top: 12rem;
  z-index: 1;
  transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  .header__title {
    font-size: 5.6rem;
    line-height: 5.6rem;
    -webkit-text-stroke: 2px ${props => props.theme.colors.red};
    color: transparent;
  }
  #mediaShare {
    display: flex;
    flex-direction: row;
    transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(-500px);
    margin-left: -1rem;
    button {
      width: fit-content;
      svg {
        width: 35px;
      }
    }
  }
  @media (min-width: 920px) {
    top: 10rem;
    transform: translateX(0) !important;
    .header__title {
      font-size: 7.6rem;
      line-height: 7.6rem;
    }
    #mediaShare button svg {
      width: 40px;
    }
  }
`;

const StickyTitle = ({isFolder, share, folder, children}) => {

  useEffect(() => {
    if (isFolder) {
      if (share) {
        document.getElementById('mediaShare').style.transform='translateX(0)';
      } else {
        document.getElementById('mediaShare').style.transform='translateX(-500px)';
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
                url={process.env.REACT_APP_FRONTEND + folder.route}
                quote={`Merra Marie: ` + folder.title}
              >
                <FacebookIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </FacebookShareButton>
            </div>
            <div>
              <TwitterShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route}
                title={`Merra Marie: ` + folder.title}
              >
                <TwitterIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </TwitterShareButton>
            </div>
            <div>
              <TumblrShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route}
                title={`Merra Marie: ` + folder.title}
              >
                <TumblrIcon iconFillColor='#f2d5d5' bgStyle={{fill: 'transparent'}} />
              </TumblrShareButton>
            </div>
            <div>
              <WhatsappShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route}
                title={`Merra Marie: ` + folder.title}
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