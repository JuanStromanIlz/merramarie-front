import react, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';
import {AdminCont} from '../context/AdminContext';
import { useHistory } from "react-router-dom";


const logInSchema = Yup.object().shape({
  username: Yup.string().required('Ingrese un usuario'),
  password: Yup.string().required('Ingrese una contraseña')
});

function LogInView() {
  const {setToken} = useContext(AdminCont);
  const { newCancelToken, isCancel } = useCancelToken();
  let history = useHistory();

  async function sendLogForm(values) {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_APIHOST}panel/log_in`,
        data: values,
        cancelToken: newCancelToken()
      });
      if (res) {
        setToken(res.data);
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_NAME, res.data);
        history.push('/control');
      }
    } catch(err) {
      if (isCancel(err)) return;
    }
  }

  return (
    <div>
      <h2>Log In</h2>
      <Formik
        initialValues={{
         username: '',
         password: ''
       }}
       validationSchema={logInSchema}
       onSubmit={values => {
         sendLogForm(values)
       }}
      >
        {({errors, touched}) => (
          <Form>
            <Field name='username' />
            <Field name='password' />
            <button type='submit'>Ingresar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LogInView;