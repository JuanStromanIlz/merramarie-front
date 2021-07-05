import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '../styled-components/EntryForm';
import { StickyTitle } from '../styled-components/StickyTitle';

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
    return !value && !parent.videoLink && !parent.images && parent.newImages.length === 0 ? 
      createError({
        path: 'global',
        message: 'uno de estos campos es obligatorio'
      })
    : true;
  }),
  videoLink: Yup.string()
  .test((value, {parent, createError}) => {
    return !value && !parent.description && !parent.images && parent.newImages.length === 0 ? 
      createError({
        path: 'global',
        message: 'uno de estos campos es obligatorio'
      })
    : true;
  }),
  newImages: Yup.mixed()
    .test('newImages', 'Las imagenes deben ser jpg, jpeg, gif o png y no deben superar los 5mb', value => !value || customValidate(value))
});

function EditFolder({folder, sendEdit}) {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    setImagesArray(folder.images);
  }, [folder.images]);

  return (
    <div>
      <StickyTitle>Editar Documento</StickyTitle>
      <Formik
        initialValues={{
          label: folder.label,
          category: folder.category,
          title: folder.title,
          description: folder.description,
          videoLink: folder.videoLink,
          images: folder.images,
          deleteImgs: [],
          newImages: []
        }}
        validationSchema={ItemSchema}
        onSubmit={values => {
          for (let propName in values) {
            if (values[propName] === null || values[propName] === undefined) {
              delete values[propName];
            }
          }
          sendEdit(values);
        }}
      >
        {({values, errors, touched, handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <div className='formInput formInput__label'>
              <label for='label'>Label</label>
              <Field as="select" name="label">
                <option value='editorial'>editorial</option>
                <option value='artwork'>artwork</option>
                <option value='commercial'>commercial</option>
                <option value='films'>films</option>
                <option value='exhibitions'>exhibitions</option>
                <option value='publications'>publications</option>
              </Field>
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
            <div className='formInput formInput__images'>
              <label for='newImages'>Agregar imagenes</label>
              <Input
                name='newImages' 
                component={FileUploader}
              />
            </div>
            <div className='formInput'>
              <label>Eliminar imagenes</label>
            </div>
            <div className='imagesEdit'>
            {folder.images ?
              imagesArray.map(img => 
              <div className='imageSelect' key={img.path}>
                <label>
                  <Field type='checkbox' name='deleteImgs' value={img.path}/>
                </label>
                <img src={img.url} alt='some-img'/>
              </div>
            ) : null}
            </div>
            <button type='submit'>Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditFolder;