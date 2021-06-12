import {useState, useEffect, useContext} from 'react';
import {AdminCont} from '../context/AdminContext';
import {useParams} from 'react-router-dom';
import {useCancelToken} from '../hooks/CancelTokenAxios';
import axios from 'axios';
import EditFolder from '../components/EditFolder';

function AdminFolder() {
  const [folder, setFolder] = useState({});
  const [edit, setEdit] = useState(false);
  const { newCancelToken, isCancel } = useCancelToken();
  const {token} = useContext(AdminCont);
  let {name} = useParams();

  async function deleteItem() {
    try {
      let res = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_APIHOST}panel/delete/${name}`,
        withCredentials: true,
        headers: {
          'authorization': `Bearer ${token}`
        },
        cancelToken: newCancelToken()
      });
      if (res) {
        console.log(res.data)
      }
    } catch(err) {

    }
  }

  async function saveEdit(values) {
    let formWithImages = false;
    let newForm = values;
    delete newForm.images;
    // let newImages = [];
    let formToCompare = {
      label: folder.label,
      category: folder.category,
      title: folder.title,
      description: folder.description,
      videoLink: folder.videoLink
    };
    let formToSave = {};
    //Check if there're new images
    if ('newImages' in newForm) {
      formWithImages = true;
      formToSave['images'] = newForm.newImages; 
      delete newForm.newImages;
    }
    //Compare the entries to see if there are any changes
    for (let propName in newForm) {
      if (newForm[propName] !== formToCompare[propName]) {
        formToSave[propName] = newForm[propName];
      }
      //Add deleteImgs to the formToSave array
      if (propName === 'deleteImgs') {
        formToSave[propName] = newForm[propName];
      }
    }
    if (formWithImages) {
      try {
        let sendForm = new FormData();
        for (const key in formToSave) {
          const element = formToSave[key];
          if (key === 'images') {
            for (let i = 0; i < element.length; i++) {
              sendForm.append('images', element[i]);
            }
          } else {
            sendForm.append(key, element);
          }
        }
        let res = await axios({
          method: 'patch',
          url: `${process.env.REACT_APP_APIHOST}panel/edit_new_imgs/${name}`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: sendForm,
          cancelToken: newCancelToken()
        });
        if (res) {
          console.log(res.data)
        }
      } catch (err) {

      }
    } else {
      try {
        let res = await axios({
          method: 'patch',
          url: `${process.env.REACT_APP_APIHOST}panel/edit/${name}`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: formToSave,
          cancelToken: newCancelToken()
        });
        if (res) {
          console.log(res.data)
        }
      } catch (err) {

      }
    }
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIHOST + 'panel/folder/' + name, {
      cancelToken: newCancelToken(),
      withCredentials: true,
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setFolder(res.data);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, []);

  return (
    <>
    <button onClick={() => setEdit(!edit)}>Editar</button>
    <button onClick={() => deleteItem()}>Eliminar</button>
    {edit ?
    <EditFolder folder={folder} sendEdit={saveEdit}/> :
    <h1>{folder.title}</h1>}
    </>
  );
};

export default AdminFolder;