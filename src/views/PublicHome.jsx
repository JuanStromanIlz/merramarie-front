import { useEffect } from 'react';
import { Banner } from '../styled-components/Banner';

function PublicHome() {

  useEffect(()=> {
    window.document.title='Merra Marie';
  }, []);

  return (
    <Banner />
  );
};

export default PublicHome;