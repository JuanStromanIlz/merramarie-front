import {Formik, Field} from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

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
            if (values[propName] === null || values[propName] === undefined || values[propName].length === 0) {
              delete values[propName];
            }
          }
          sendEdit(values);
        }}
      >
        {({values, errors, touched, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            {console.log(errors)}
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
            <Field name='title' autoComplete='off'/>
            <label for='category'>Category</label>
            <Field name='category' autoComplete='off'/>
            <label for='description'>Description</label>
            <Field name='description' autoComplete='off'/>
            <label for='videoLink'>Video Link</label>
            <Field name='videoLink' autoComplete='off'/>
            <label for='newImages'>Agregar imagenes</label>
            <Field
              name='newImages' 
              component={FileUploader}
            />
            {folder.images && 
              imagesArray.map(img => 
              //This needs to be a styled-component
              <label key={img.path}>
                <Field type='checkbox' name='deleteImgs' value={img.path}/>
                <img src={img.url} alt='some-img'/>
              </label>
            )}
            <button type='submit'>Guardar</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditFolder;