import { useState, useEffect } from 'react';
import { NewDoc } from '../components/NewDoc';
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';
import { StickyTitle } from '../styled-components/StickyTitle';
import { Loading } from '../styled-components/Loading';

const AdminNewEntry = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.document.title= 'Nueva entrada | Merra Marie';
  }, []);

  return (
    loading ?
      <Loading />
    :
    <>
      <Nav />
      <Wrapper>
        <StickyTitle>Nueva entrada</StickyTitle>
        <NewDoc setLoading={setLoading} />
      </Wrapper>
    </>
  );
}

export default AdminNewEntry;