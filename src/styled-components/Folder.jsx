import { useState, useRef } from 'react';
import styled from 'styled-components';
import Linkify from 'react-linkify';
import { StickyTitle } from './StickyTitle';
import { useEffect } from 'react';

const Folder = styled.div`
  article {
    .content {
      > div {
        margin-bottom: 2rem;
      }
      .content__text {
        white-space: pre-line;
      }
      .content__images {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(600px, 1f));
        grid-gap: 2.6rem;
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
    }
  }
  @media (min-width: 920px) {
    .content__images {
      ${'' /* grid-template-columns: repeat(auto-fit, minmax(auto, 400px)) !important; */}
      grid-template-columns: repeat(2, minmax(auto, 30%)) !important;
      .bigImg {
        grid-column-end: 3 !important;
      }
    }
    .content__text {
      max-width: 60%;
    }
  }
`;

const FolderView = ({folder}) => {
  const [pageBottom, setPageBottom] = useState(false);
  const folderRef = useRef(null); 
    
  useEffect(() => { 
    const onScroll = (e) => {
      if (folderRef.current.clientHeight < 250) {
        setPageBottom(true);
      } else {
        setPageBottom(window.scrollY > (folderRef.current.clientHeight / 3) * 2);
      }
    }; 
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Folder className='folder__item'>
      <article>
        <StickyTitle 
          isFolder={true} 
          share={pageBottom} 
          folder={{title: folder.title, route: folder.route_title}}
        >
          {folder.title}
        </StickyTitle>
        <div  ref={folderRef} className='content'>
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
                <img loading='lazy' width='100%' height='100%' src={img.url} alt={folder.title}/>
              )}
            </div> 
          : null}
          {folder.videoLink ? 
            <div className='content__video'>
              <iframe 
                title={folder.title} 
                src={folder.videoLink} 
                frameBorder="0" 
                allow="fullscreen; picture-in-picture" 
              ></iframe>
            </div> 
          : null}
        </div>
      </article>
    </Folder>
  );
};

export {FolderView as Folder};