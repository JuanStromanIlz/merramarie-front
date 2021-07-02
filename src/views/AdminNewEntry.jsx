import { NewDoc } from '../components/NewDoc';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';
import { StickyTitle } from '../styled-components/StickyTitle';

const AdminNewEntry = () => {
  return (
    <>
      <Nav />
      <Wrapper>
        <StickyTitle>Nueva entrada</StickyTitle>
        <NewDoc />
      </Wrapper>
    </>
  );
}

export default AdminNewEntry;