import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '../styled-components/EntryForm';
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
  deleteImgs: Yup.array()
    .test((value, {parent, createError}) => {
      let newImgsArray = Array.from(parent.newImages)
      if (parent.images) {
        return value.length === parent.images.length && !parent.videoLink && !parent.description && newImgsArray.length === 0 ?
          createError({
            path: 'global',
            message: 'uno de estos campos es obligatorio'
          })
        : true;
      } else {
        return true;
      }
      
    })
  ,
  newImages: Yup.mixed()
    .test((value, {createError}) => {
      let arrayOfImgs = Array.from(value)
      let error = false;
      // Se cambio el metodo map por un forIn
      for (const key in arrayOfImgs) {
        const img = arrayOfImgs[key];
        if (img.size > FILE_SIZE) {
          error = true;
        }
        if (!SUPPORTED_FORMATS.includes(img.type)) {
          error = true;
        }
      }
      return error ?
        createError({
          path: 'images',
          message: 'Las imagenes deben ser jpg, jpeg, gif o png y no deben superar los 5mb'
        })
      : true;
    })
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
              <Field name='title' autoComplete='off' placeholder={errors.title && touched.title ? errors.title : null} />
            </div>
            <div className={`formInput ${touched.category ? errors.category ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='category'># Categoria</label>
              <Field name='category' autoComplete='off' />
            </div>
            <div className={`formInput ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='description'>{values.label === 'publications' ? 'Link Externo' : 'Descripción'}</label>
              {values.label !== 'publications' ? 
                <Field as='textarea' rows='5' name='description' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />
              : <Field name='description' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />}
              </div>
            <div className={`formInput ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='videoLink'>Video Link</label>
              <Field name='videoLink' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />
            </div>
            <div className={`formInput formInput__images ${touched.description && touched.videoLink && touched.images ? errors.global || errors.images ? 'errorStyle' : 'okStyle' : null}`}>
              <label for='newImages'>Agregar imagenes</label>
              <Field
                name='newImages' 
                component={FileUploader}
              />
              <div className={`errorWrapper ${touched.description && touched.videoLink && touched.images ? errors.global || errors.images ? 'showError' : null : null}`}>
                <div>
                  <span>{errors.global || errors.images}</span>
                </div>
              </div>
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