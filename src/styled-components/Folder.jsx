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
    header {
      margin-bottom: 150px;
      .label {
        letter-spacing: .5rem;
        text-transform: uppercase;
        color: ${props => props.theme.colors.pink};
      }
      .header__title {
        margin-top: 3.1rem;
        margin-bottom: 3.6rem;
        h1 {
          font-size: 5.6rem;
          line-height: 5.6rem;
          margin-bottom: .6rem;
          color: ${props => props.theme.colors.red};
        }
        .category {
          font-size: 1.8rem;
          margin-right: auto;
        }
      }
      .header__social {
        display: flex;
        flex-direction: row;
        margin-left: -1.7rem;
      }
    }
    .content {
      > div {
        margin-bottom: 2rem;
      }
      .content__text {
      }
      .content__images {
        .imgContainer {
          display: inline-block;
          width: 100%;
          ${'' /* height: 700px; */}
          > div {
            height: 100%;
            width: 100%;
          }
          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            display: flex;
            padding-bottom: 2rem;
          }
        }
        .imgContainer:last-child {
          padding-bottom: 0;
          img {
            margin-left: auto;
            margin-right: auto;
          }
        }
        .bigImage {
          max-width: 100% !important;
          img {
            max-width: 900px;
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
    }
    footer {
      border-top: 2px solid ${props => props.theme.colors.pink};
      padding-top: 2rem;
    }
  }
  @media (min-width: 920px) {
    article {
      header {
        .label {
          font-size: 3.5rem;
        }
        .header__title {
          h1 {
          font-size: 7.6rem;
          line-height: 7.6rem;
          }
          .category {
            font-size: 2.6rem;
          }
        }
      }
      .content {
        .content__images {
          .imgContainer {
            max-width: 50%;
          }
          .imgContainer:nth-child(odd) img {
            padding-right: 2rem;
          }
          .imgContainer:last-child img {
            padding-bottom: 0;
            padding-right: 0;
          }
        }
      }
    }
  }
`;

const FolderView = ({folder, backToLabel}) => {
  return (
    <Folder>
      <div className='folder__wrapper'>
        <article>
          <header>
            <h3 className='label' onClick={() => backToLabel()}>{folder.label}</h3>
            <div className='header__title'>
              <h1>{folder.title}</h1>
              {folder.category ? <h4 className='category'>{folder.category}</h4> : null}
            </div>
            <div className='header__social'>
              <div>
              <FacebookShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route_title}
                quote={`Merra Marie: ` + folder.title}
              >
                <FacebookIcon size={50} bgStyle={{fill: 'black'}}/>
              </FacebookShareButton>
              </div>
              <div>
              <TwitterShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route_title}
                title={`Merra Marie: ` + folder.title}
              >
                <TwitterIcon size={50} bgStyle={{fill: 'black'}}/>
              </TwitterShareButton>
              </div>
              <div>
              <TumblrShareButton
                url={process.env.REACT_APP_FRONTEND + folder.route_title}
                title={`Merra Marie: ` + folder.title}
              >
                <TumblrIcon size={50} bgStyle={{fill: 'black'}}/>
              </TumblrShareButton>
              </div>
              <div>
              <WhatsappShareButton
                // url={process.env.REACT_APP_FRONTEND + folder.route_title}
                url='https://fonts.google.com/icons'
                title={`Merra Marie: ` + folder.title}
              >
                <WhatsappIcon size={50} bgStyle={{fill: 'black'}}/>
              </WhatsappShareButton>
              </div>
            </div>
          </header>
          <div className='content'>
            {folder.description ? 
              <div className='content__text'>
              <Linkify>
                <p>{folder.description}</p>
              </Linkify>
              </div>
            : null}
            {folder.images ? 
            <div className='content__images'>
              {folder.images.map((img, i) => 
                <div key={i} className={`imgContainer ${img.width > img.height ? 'bigImage' : ''}`}>
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
              </div>
             : null}
          </div>
          <footer>
            <h3>ver mas {folder.label}</h3>
          </footer>
        </article>
      </div>
    </Folder>
  );
};

export {FolderView as Folder};