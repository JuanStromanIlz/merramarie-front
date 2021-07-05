import styled from 'styled-components';
import { Field } from 'formik';

const Form = styled.form`
  .form__wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }
  .formInput {
    display: flex;
    flex-flow: column nowrap;
    max-width: 400px;
    input, select, button {
      color: ${props => props.theme.colors.pink};
      border: none;
      box-shadow: 0 1px 0 0 rgba(255, 255, 255, .2);
      background: #000;
      ::placeholder {
        color: ${props => props.theme.colors.red};
      }
      option {
        background: #000;
      }
      :focus, :hover, :active {
        outline: none;
        background: rgba(255, 255, 255, .2);
        box-shadow: 0 1px 0 0 ${props => props.theme.colors.pink};
      }
    }
    label {
      text-transform: uppercase;
      font-size: 1.5rem;
      margin-bottom: .5rem;
      color: ${props => props.theme.colors.pink};
    }
    .errorWrapper {
      position: relative;
      opacity: 0;
      transition: opacity .3s;
      > div {
        position: absolute;
        inset: 0;
        margin-top: 5px;
        color: ${props => props.theme.colors.red};
      }
    }
    .showError {
      opacity: 1;
    }
  }
  .formInput__label {
    flex-direction: row;
    label {
      margin-right: 1rem;
    }
    input {
      background: #000;
    }
  }
  .formInput__images {
    padding-bottom: 3rem;
    input {
      visibility: hidden;
      border: none;
      box-shadow: 0 0 0 0 !important;
    }
    input:before {
      visibility: visible;
      content: 'Subir imagenes';
      display: inline-block;
      padding: 1rem;
      color: ${props => props.theme.colors.pink};
      border: 1px solid rgba(255, 255, 255, .2);
    }
    input:hover:before {
      border-color: ${props => props.theme.colors.pink};
    }
  }
  /* Styles for validation */
  .errorStyle {
    input, select {
      box-shadow: 0 1px 0 0 ${props => props.theme.colors.red};
    }
  }
  .okStyle {
    input, select {
      box-shadow: 0 1px 0 0 #64b450;
    }
    input:before {
      border-color: #64b450;
    }
  }
  .imagesEdit {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 2rem;
    .imageSelect {
      position: relative;
      input {
        position: absolute;
        inset: 0;
        margin-top: 1rem;
        margin-left: 1rem; 
        transform: scale(1.5);
      }
      label {
        position: absolute;
        inset: 0;
      }
      label:hover {
        box-shadow: 0 0 0 1px ${props => props.theme.colors.pink};
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: scale-down;
      }
    }
  }
  button {
    width: fit-content;
    text-transform: uppercase;
    font-weight: 700;
    border: 2px solid ${props => props.theme.colors.pink};
    box-shadow: 3px 3px 0 0 ${props => props.theme.colors.red};
    padding: 1rem;
    color: ${props => props.theme.colors.pink};
    background-color: transparent;
  }
  button:hover {
    color: #64b450;
    box-shadow: 3px 3px 0 0 #64b450;
    transform: translateY(-5px);
  }
  @media (min-width: 920px) {
    .imagesEdit {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
    }
  }
`;

const Input = styled(Field)`
  appeareance: none; 
  resize: none;
`;

const FormContainer = ({children, onSubmit}) => {
  return (
    <Form onSubmit={onSubmit}>
      <div className='form__wrapper'>
      {children}
      </div>
    </Form>
  );
}

export { FormContainer as Form, Input };