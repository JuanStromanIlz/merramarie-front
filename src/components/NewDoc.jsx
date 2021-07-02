import { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AdminCont } from '../context/AdminContext';
import { Form, Input } from '../styled-components/EntryForm';

const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const FileUploader = ({ form, field }) => {
  const handleChange = event => {
    const fileUploaded = event.target.files;
    form.setFieldValue(field.name, fileUploaded)
  };
  return (
    <input 
      type='file'
      accept='.jpg,.jpeg,.gif,.png'
      onChange={handleChange}
      multiple
    /> 
  );
};

function customValidate(value){
  let arrayOfImgs = Array.from(value)
  let error = false;
  // Se cambio el metodo map por un forIn
  for (const key in arrayOfImgs) {
    const img = arrayOfImgs[key];
    if (img.size > FILE_SIZE) {
      return error = true;
    }
    if (!SUPPORTED_FORMATS.includes(img.type)) {
      return error = true;
    }
  }
  if (error) {
    return false;
  } else {
    return true;
  }
}

const ItemSchema = Yup.object().shape({
  title: Yup.string().required('Ingrese un titulo'),
  category: Yup.string(),
  description: Yup.string()
  .test((value, {parent, createError}) => {
    return !value && !parent.videoLink && parent.images.length === 0 ? 
      createError({
        path: 'global',
        message: 'uno de estos campos es obligatorio'
      })
    : true;
  }),
  videoLink: Yup.string()
  .test((value, {parent, createError}) => {
    return !value && !parent.description && parent.images.length === 0 ? 
      createError({
        path: 'global',
        message: 'uno de estos campos es obligatorio'
      })
    : true;
  }),
  images: Yup.mixed()
    .test('images', 'Las imagenes deben ser jpg, jpeg, gif o png y no deben superar los 5mb', value => customValidate(value)),
});

function NewDoc() {
  const {token} = useContext(AdminCont);
  const { newCancelToken, isCancel } = useCancelToken();
  let history = useHistory();

  async function sendValues(values) {
    for (let propName in values) {
      if (values[propName] === null || values[propName] === undefined || values[propName].length === 0) {
        delete values[propName];
      }
    }
    if ('images' in values) {
      try {
        let newItemForm = new FormData();
        for (const key in values) {
          const element = values[key];
          if (key === 'images') {
            for (let i = 0; i < element.length; i++) {
              newItemForm.append('images', element[i]);
            }
          } else {
            newItemForm.append(key, element);
          }
        }
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
        if (res.status === 201) {
          let title = values.title.trim();
          title = title.toLowerCase();
          title = title.replace(/ /g, '_');
          history.push(`/panel/folder/${title}`);
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
        if (res.status === 201) {
          let title = values.title.trim();
          title = title.toLowerCase();
          title = title.replace(/ /g, '_');
          history.push(`/panel/folder/${title}`);
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
         label: 'editorial',
         category: '',
         title: '',
         description: '',
         videoLink: '',
         images: []
       }}
       validationSchema={ItemSchema}
       onSubmit={(values, { resetForm })=> {
         sendValues(values);
         resetForm();
       }}
      >
        {({errors, touched, handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <div className={`formInput formInput__label ${touched.label ? errors.label ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='label'>Label</label>
              <Input as='select' name='label'>
                <option value='editorial'>editorial</option>
                <option value='artwork'>artwork</option>
                <option value='commercial'>commercial</option>
                <option value='films'>films</option>
                <option value='exhibitions'>exhibitions</option>
                <option value='publications'>publications</option>
              </Input>
            </div>
            <div className={`formInput ${touched.title ? errors.title ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='title'>Titulo</label>
              <Input name='title' autoComplete='off' placeholder={errors.title && touched.title ? errors.title : null} />
            </div>
            <div className={`formInput ${touched.category ? errors.category ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='category'># Categoria</label>
              <Input name='category' autoComplete='off' />
            </div>
            <div className={`formInput ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='description'>Descripción</label>
              <Input name='description' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />
            </div>
            <div className={`formInput ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='videoLink'>Video Link</label>
              <Input name='videoLink' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />
            </div>
            <div className={`formInput formInput__images ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='images'>Imagenes</label>
              <Input
                name='images' 
                component={FileUploader}
                placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null}
              />
              <div className={`errorWrapper ${errors.global && touched.description && touched.videoLink && touched.images ? 'showError' : null}`}>
                <div>
                  <span>{errors.global}</span>
                </div>
              </div>
            </div>
            <button type='submit'>Crear</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { NewDoc };