import styled from 'styled-components';

const Page = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  .wrapper {
    padding-top: 4rem;
    padding-bottom: 4rem;
    padding-left: 2.6rem;
    padding-right: 2.6rem;
  }
`;

const Wrapper = ({children}) => {
  return (
    <Page>
      <div className='wrapper'>
        {children}
      </div>
    </Page>
  );
}

export { Wrapper };
