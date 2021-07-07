import { StickyTitle } from "../styled-components/StickyTitle";
import { Nav } from '../styled-components/Navbar';
import { Wrapper } from '../styled-components/PageWrapper';
import styled from 'styled-components';

const About = styled.div`
  @media (min-width: 920px) {
    .text {
      max-width: 60%;
    }
  }
`;

function AboutMe() {
  return (
    <>
      <Nav />
      <Wrapper>
        <About>
          <StickyTitle>Sobre mi</StickyTitle>
          <p className='text'>
          Hola! Soy Merra Marie, artista visual, audiovisual y poeta. 
          <br/>
          Actualmente estoy radicada en Buenos Aires, Argentina donde me desempeño en áreas de fotografía de moda, dirección de arte, edición y montaje. He realizado numerosos fashion films, cortos, videos musicales y video ensayos. En este momento estoy terminando la Licenciatura en Artes Audiovisuales orientada en Dirección de Fotografía.
          <br/>
          n mi día a día llevo un diario de fotos por lo que también trabajo con amigos, amor, lugares, pequeñas fantasías!
          <br/>
          Dibujo y pinto también! En múltiples soportes y variadas técnicas.
          <br/>
          Por último: escribo un montón. Poesía, cuentos y reflexiones de mi vida.
          </p>
        </About>
      </Wrapper>
    </>
  );
};

export default AboutMe;