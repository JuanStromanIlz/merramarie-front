import {Formik, Field} from 'formik';
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
  title: Yup.string().required('Titulo obligatorio'),
  category: Yup.string(),
  description: Yup.string(),
  videoLink: Yup.string(),
  images: Yup.mixed()
    .test('images', 'Las imagenes deben ser jpg, jpeg, gif o png y no deben superar los 5mb', value => value || customValidate(value))
});

function EditFolder({folder, sendEdit}) {

  return (
    <div>
      <Formik
        initialValues={{
          label: folder.label,
          category: folder.category,
          title: folder.title,
          description: folder.description,
          videoLink: folder.videoLink,
          images: folder.images
        }}
        validationSchema={ItemSchema}
        onSubmit={values => {
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
            <label for='images'>Images</label>
            <Field
              name='images' 
              component={FileUploader}
            />
            <button type='submit'>Guardar</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditFolder;