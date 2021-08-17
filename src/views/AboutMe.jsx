import { StickyTitle } from '../styled-components/StickyTitle';
import { Nav } from '../styled-components/Navbar';
import { About } from '../styled-components/About';
import { Wrapper } from '../styled-components/PageWrapper';
import { useEffect } from 'react';

function AboutMe() {

  useEffect(() => {
    /* og:type */
    window.document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
    /* og:title */
    window.document.querySelector('meta[property="og:title"]').setAttribute("content", 'Sobre mi | Merra Marie');
    window.document.querySelector('meta[name="twitter:title"]').setAttribute("content", 'Sobre mi | Merra Marie');
    window.document.title= 'Sobre mi | Merra Marie';
    /* og:description */
    window.document.querySelector('meta[name="description"]').setAttribute("content", 'Desde Argentina con amor.');
    window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", 'Desde Argentina con amor.');
    /* og:url */
    window.document.querySelector('meta[property="og:url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/about_me`);
    /* og:images default */
    window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
    window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
  }, []);

  return (
    <>
      <Nav />
      <Wrapper>
        <About>
          <StickyTitle>Sobre mi</StickyTitle>
          <div id='infoWrapper'>
            <p className='text'>
              Hola! Soy Merra Marie, artista visual, audiovisual y poeta.<br />
              <br/>
              Actualmente estoy radicada en Buenos Aires, Argentina donde me desempeño en áreas de fotografía de moda, dirección de arte, edición y montaje. He realizado numerosos fashion films, cortos, videos musicales y video ensayos. En este momento estoy terminando la Licenciatura en Artes Audiovisuales orientada en Dirección de Fotografía.<br/>
              <br />
              En mi día a día llevo un diario de fotos por lo que también trabajo con amigos, amor, lugares, pequeñas fantasías!<br/>
              Dibujo y pinto también! En múltiples soportes y variadas técnicas.<br />
              <br/>
              Por último: escribo un montón. Poesía, cuentos y reflexiones de mi vida.
            </p>
          </div>
        </About>
      </Wrapper>
    </>
  );
};

export default AboutMe;