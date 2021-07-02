import styled from 'styled-components';
import {Field} from 'formik';

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
      :focus {
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
      border: none;
      box-shadow: 0 0 0 0 !important;
    }
  }
  .errorStyle {
    input, select {
      box-shadow: 0 1px 0 0 ${props => props.theme.colors.red};
    }
  }
  .okStyle {
    input, select {
      box-shadow: 0 1px 0 0 #64b450;
    }
  }
  .imagesEdit {
    display: flex;
    flex-direction: row;
    img {
      max-width: 200px;
    }
  }
  button {
    max-width: 100px;
    text-transform: uppercase;
    font-weight: 700;
    border: 2px solid ${props => props.theme.colors.pink};
    box-shadow: 3px 3px 0 0 ${props => props.theme.colors.red};
    padding: 1rem 0;
    color: ${props => props.theme.colors.pink};
    background-color: transparent;
  }
  button:hover {
    color: #64b450;
    box-shadow: 3px 3px 0 0 #64b450;
    transform: translateY(-5px);
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

export {FormContainer as Form, Input};