import styled from 'styled-components';
import {Field} from 'formik';

const Form = styled.form`
  .form__wrapper {
    display: flex;
    flex-flow: column nowrap;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .form__inputContainer {
    display: flex;
    flex-flow: column nowrap;
    input, select, button {
      margin-right: auto;
    }
    label {
      font-size: 1.8rem;
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