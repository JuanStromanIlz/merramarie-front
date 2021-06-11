import {useContext} from 'react';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';
import {AdminCont} from '../context/AdminContext';

const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const FileUploader = ({ form, field }) => {
  const handleChange = event => {
    const fileUploaded = event.target.files;
    form.setFieldValue(field.name, fileUploaded)
  };
  return (
    <input 
      type="file"
      accept=".jpg,.jpeg,.gif,.png"
      onChange={handleChange}
      multiple
    /> 
  );
};

function customValidate(value){
  let arrayOfImgs = Array.from(value)
  let error = false;
  arrayOfImgs.map(img => {
    if (img.size > FILE_SIZE) {
      error = true;
    }
    if (!SUPPORTED_FORMATS.includes(img.type)) {
      error = true;
    }
  });
  if (error) {
    return false;
  } else {
    return true;
  }
}

const ItemSchema = Yup.object().shape({
  title: Yup.string().required('Ingrese un titulo'),
  category: Yup.string(),
  description: Yup.string(),
  videoLink: Yup.string(),
  images: Yup.mixed()
    .test('images', 'Las imagenes deben ser jpg, jpeg, gif o png y no deben superar los 5mb', value => value || customValidate(value))
});

function AdminNewEntry() {
  const {token} = useContext(AdminCont);
  const { newCancelToken, isCancel } = useCancelToken();

  async function sendValues(values) {
    for (let propName in values) {
      if (values[propName] === null || values[propName] === undefined || values[propName].length === 0) {
        delete values[propName];
      }
    }
    if ('images' in values) {
      try {
        let newItemForm = new FormData();
        Object.keys(values).forEach(key => newItemForm.append(key, values[key]));
        let res = await axios({
          method: 'post',
          url: `${process.env.REACT_APP_APIHOST}panel/new_with_imgs`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: newItemForm,
          cancelToken: newCancelToken()
        });
        if (res) {
          console.log(res.data)
        }
      } catch(err) {
        if (isCancel(err)) return;
      }
    } else {
      try {
        let res = await axios({
          method: 'post',
          url: `${process.env.REACT_APP_APIHOST}panel/new`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: values,
          cancelToken: newCancelToken()
        });
        if (res) {
          console.log(res.data)
        }
      } catch(err) {
        if (isCancel(err)) return;
      }
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
         label: '',
         category: '',
         title: '',
         description: '',
         videoLink: '',
         images: []
       }}
       validationSchema={ItemSchema}
       onSubmit={values => {
         sendValues(values)
       }}
      >
        {({errors, touched, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <label for='label'>Label</label>
            <Field as="select" name="label">
              <option value='editorial'>editorial</option>
              <option value='artwork'>artwork</option>
              <option value='commercial'>commercial</option>
              <option value='films'>films</option>
              <option value='exhibitions'>exhibitions</option>
              <option value='publications'>publications</option>
            </Field>
            <label for='title'>Title</label>
            <Field name='title' />
            <label for='category'>Category</label>
            <Field name='category' />
            <label for='description'>Description</label>
            <Field name='description' />
            <label for='videoLink'>Video Link</label>
            <Field name='videoLink' />
            <label for='images'>Images</label>
            <Field
              name='images' 
              component={FileUploader}
            />
            <button type='submit'>Ingresar</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AdminNewEntry;