import styled from 'styled-components';

const Label = styled.div`
  .label__wrapper {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 4rem;
    padding-bottom: 4rem;
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    .label__title {
      h1 {
        font-size: 5.6rem;
        line-height: 5.6rem;
        margin-bottom: 3rem;
        -webkit-text-stroke: 2px ${props => props.theme.colors.red};
        color: transparent;
        text-transform: uppercase;
      }
    }
    .label__content {
      display: flex;
      gap: 2rem;
      align-content: flex-start;
      flex-direction: column;
    }
  }
  @media (min-width: 920px) {
    .label__content {
      flex-direction: row !important;
    }
  }
`;

const Card = styled.div`
  width: 450px;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  header {
    position: relative;
    aspect-ratio: 1 / 1;
    margin-bottom: 1.5rem;
    .imageContainer {
      position: absolute;
      inset: 0 0 0 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .card__content {
  }
`;

const LabelCard = ({item, sendTo}) => {
  return (
    <Card onClick={() => sendTo(item.route_title)}>
      {item.images ? 
        <header>
          <div className='imageContainer'>
            <img src={item.images[0].url} alt={item.title}></img>
          </div>
        </header>
        : 
        item.videoLink ?
          <header>
            <div className='videoContainer'>
              <iframe 
                title={item.title} 
                src={item.videoLink} 
                frameborder="0" 
                allow="fullscreen; picture-in-picture" 
                allowfullscreen 
              ></iframe>
            </div> 
          </header>
      : null }
      <div className='card_info'>
        <h1>{item.title}</h1>
        {item.category ? <h4>{item.category}</h4> : null}
      </div>
    </Card>
  );
};

const LabelView = ({name, label, sendTo}) => {
  return (
    <Label>
      <div className='label__wrapper'>
        <div className='label__title'>
          <h1>{name}</h1>
        </div>
        <div className='label__content'>
          {label.map(item => 
            <LabelCard item={item} sendTo={sendTo}/>
          )}
        </div>
      </div>
    </Label>
  );
};

export {LabelView as Label};