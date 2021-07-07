import styled from 'styled-components';

const Page = styled.div`
  .wrapper {
    padding: 2.6rem;
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
