import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AdminCont } from '../context/AdminContext';
import { Loading } from '../styled-components/Loading';
import { useHistory } from 'react-router-dom';
import { Wrapper } from '../styled-components/PageWrapper';
import { StickyTitle } from '../styled-components/StickyTitle';
import { Form, Input } from '../styled-components/EntryForm';

const logInSchema = Yup.object().shape({
  username: Yup.string().required('Ingrese un usuario'),
  password: Yup.string().required('Ingrese una contraseña')
});

function LogInView() {
  const {setToken} = useContext(AdminCont);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  async function sendLogForm(values) {
    setLoading(true);
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_APIHOST}panel/log_in`,
        data: values
      });
      if (res) {
        setToken(res.data);
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_NAME, res.data);
        history.push('/');
      }
    } catch(err) {
      if (err) {
        setLoading(false);
        let inputContainer = document.getElementsByClassName('formInput');
        let input = document.getElementsByTagName('input');
        for (let i = 0; i < inputContainer.length; i++) {
          inputContainer[i].classList.add('errorStyle');
          input[i].placeholder= 'Algun dato es incorrecto';
        }
      }
    }
  }

  return (
    loading ?
      <Loading /> :
      <Wrapper>
        <StickyTitle>Ingresar</StickyTitle>
        <Formik
          initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={logInSchema}
        onSubmit={(values, { resetForm }) => {
            resetForm();
            sendLogForm(values);
        }}
        >
          {({errors, touched, handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
              <div className={`formInput ${touched.username ? errors.username ? 'errorStyle' : 'okStyle' : null}`}>
                <label for='username'>Usuario</label>
                <Input name='username' autoComplete='off' />
              </div>
              <div className={`formInput ${touched.password ? errors.password ? 'errorStyle' : 'okStyle' : null}`}>
                <label for='password'>Contraseña</label>
                <Input name='password' type='password' autoComplete='off' />
              </div>
              <button type='submit'>Ingresar</button>
            </Form>
          )}
        </Formik>
      </Wrapper>
  );
}

export default LogInView;