import styled from 'styled-components';
import Linkify from 'react-linkify';
import LazyLoad from 'react-lazyload';
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
import { StickyTitle } from './StickyTitle';

const Folder = styled.div`
  .folder__wrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
  }
  article {
    padding-top: 4rem;
    padding-bottom: 4rem;
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    .content {
      > div {
        margin-bottom: 2rem;
      }
      .content__text {
      }
      .content__images {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(600px, 1f));
        grid-gap: 2rem;
        .imgContainer:last-child img {
          margin: 0 auto;
        }
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .bigImg {
          grid-column-start: 1;
          grid-column-end: 2;
          img {
            max-width: 900px;
            display: block;
            margin: 0 auto;
          }
        }
      }
      .content__video {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        padding-top: 56.25%;
        iframe {
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
        }
      }
      .content__social {
        display: flex;
        flex-direction: row;
      }
    }
    footer {
      border-top: 2px solid ${props => props.theme.colors.pink};
      padding-top: 2rem;
      .footer__nav {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media (min-width: 920px) {
    .content__images {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)) !important;
      .bigImg {
        grid-column-end: 3 !important;
      }
    }
  }
`;

const FolderView = ({folder}) => {
  return (
    <Folder className='folder__item'>
      <div className='folder__wrapper'>
        <article>
          <StickyTitle>{folder.title}</StickyTitle>
          <div className='content'>
            {folder.images ? 
            <div className='content__images'>
              {folder.images.map((img, i) => 
                <div key={i} className={`imgContainer ${img.width > img.height ? 'bigImg' : ''}`}>
                  <LazyLoad once>
                    <img src={img.url} alt={folder.title}/>
                  </LazyLoad>
                </div>
              )}
            </div> : null}
            {folder.videoLink ? 
            <div className='content__video'>
              <iframe 
                title={folder.title} 
                src={folder.videoLink} 
                frameborder="0" 
                allow="fullscreen; picture-in-picture" 
                allowfullscreen 
              ></iframe>
            </div> : null}
            {folder.description ? 
            <div className='content__text'>
            <Linkify>
              <p>{folder.description}</p>
            </Linkify>
            </div> : null}
            <div className='content__social'>
              <div>
              <FacebookShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route_title}
                quote={`Merra Marie: ` + folder.title}
              >
                <FacebookIcon size={32} iconFillColor='#f2d5d5' bgStyle={{fill: 'black'}}/>
              </FacebookShareButton>
              </div>
              <div>
              <TwitterShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route_title}
                title={`Merra Marie: ` + folder.title}
              >
                <TwitterIcon size={32} iconFillColor='#f2d5d5' bgStyle={{fill: 'black'}}/>
              </TwitterShareButton>
              </div>
              <div>
              <TumblrShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route_title}
                title={`Merra Marie: ` + folder.title}
              >
                <TumblrIcon size={32} iconFillColor='#f2d5d5' bgStyle={{fill: 'black'}}/>
              </TumblrShareButton>
              </div>
              <div>
              <WhatsappShareButton
                // url={process.env.REACT_APP_FRONTEND + folder.route_title}
                url='https://fonts.google.com/icons'
                title={`Merra Marie: ` + folder.title}
              >
                <WhatsappIcon size={32} iconFillColor='#f2d5d5' bgStyle={{fill: 'black'}}/>
              </WhatsappShareButton>
              </div>
            </div>
          </div>
          <footer>
            <div className='footer__nav'>
              <a href={`${process.env.REACT_APP_FRONTEND + folder.label}`}><h3>&lt; back</h3></a>
              <h3>next &gt;</h3>
            </div>
          </footer>
        </article>
      </div>
    </Folder>
  );
};

export {FolderView as Folder};