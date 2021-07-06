import { useState, useEffect, useContext } from 'react';
import { AdminCont } from '../context/AdminContext';
import { useParams } from 'react-router-dom';
import { useCancelToken } from '../hooks/CancelTokenAxios';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import EditFolder from '../components/EditFolder';
import { Loading } from '../styled-components/Loading';
import { Folder } from '../styled-components/Folder';
import { AdminNav } from '../styled-components/AdminNav';
import { Nav } from '../styled-components/Navbar';
import { Footer } from '../styled-components/Footer';
import { Wrapper } from '../styled-components/PageWrapper';

function AdminFolder() {
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState({});
  const [edit, setEdit] = useState(false);
  const { newCancelToken, isCancel } = useCancelToken();
  const { token } = useContext(AdminCont);
  let { name } = useParams();
  let history = useHistory();

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
        history.push(`/${folder.label}`);
      }
    } catch(err) {
      history.push('/error');
    }
  }

  async function saveEdit(values) {
    setLoading(true);
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
        formToSave[propName] = newForm[propName].toString();
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
          } 
          else {
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
        if (res.status === 201) {
          let title = values.title.trim();
          title = title.toLowerCase();
          title = title.replace(/ /g, '_');
          axios.get(process.env.REACT_APP_APIHOST + 'panel/folder/' + title, {
            cancelToken: newCancelToken(),
            withCredentials: true,
            headers: {
              'authorization': `Bearer ${token}`
            }
          }).then((res) => {
            setFolder(res.data);
            setEdit(false);
            setLoading(false);
          }).catch((error) => {
            if (isCancel(error)) return;
          });
        }
      } catch (err) {
        history.push('/error');
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
        if (res.status === 201) {
          let title = values.title.trim();
          title = title.toLowerCase();
          title = title.replace(/ /g, '_');
          axios.get(process.env.REACT_APP_APIHOST + 'panel/folder/' + title, {
            cancelToken: newCancelToken(),
            withCredentials: true,
            headers: {
              'authorization': `Bearer ${token}`
            }
          }).then((res) => {
            setFolder(res.data);
            setEdit(false);
            setLoading(false);
          }).catch((error) => {
            if (isCancel(error)) return;
          });
        }
      } catch (err) {
        history.push('/error');
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
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [name]);

  return (
    loading ?
      <Loading />
    : 
      <>
        <Nav />
        <AdminNav setEdit={setEdit} edit={edit} deleteItem={deleteItem} />
        <Wrapper>
          {edit ? 
            <EditFolder folder={folder} sendEdit={saveEdit}/> :
            <Folder folder={folder} />
          }
        </Wrapper>
        {!edit && <Footer label={folder.label} nextFolder={folder.nextFolder} />}
      </>
  );
};

export default AdminFolder;