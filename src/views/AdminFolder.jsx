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
  let { label, title } = useParams();
  let history = useHistory();

  async function deleteItem() {
    try {
      let res = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_APIHOST}panel/delete/${label}/${title}`,
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
          url: `${process.env.REACT_APP_APIHOST}panel/edit_new_imgs/${label}/${title}`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: sendForm,
          cancelToken: newCancelToken()
        });
        if (res.status === 201) {
          let newTitle = values.title.trim();
          newTitle = newTitle.toLowerCase();
          newTitle = newTitle.replace(/ /g, '_');
          axios.get(`${process.env.REACT_APP_APIHOST}panel/${label}/${newTitle}`, {
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
          url: `${process.env.REACT_APP_APIHOST}panel/edit/${label}/${title}`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: formToSave,
          cancelToken: newCancelToken()
        });
        if (res.status === 201) {
          let newTitle = values.title.trim();
          newTitle = newTitle.toLowerCase();
          newTitle = newTitle.replace(/ /g, '_');
          axios.get(`${process.env.REACT_APP_APIHOST}panel/${label}/${newTitle}`, {
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
    function metaFolder(folder) {
      /* og:type */
      window.document.querySelector('meta[property="og:type"]').setAttribute("content", "article");
      /*og:title */
      window.document.querySelector('meta[property="og:title"]').setAttribute("content", `${folder.title} por Merra Marie`);
      window.document.title= `${folder.title} por Merra Marie`;
      /* og:description default */
      window.document.querySelector('meta[name="description"]').setAttribute("content",'Ver este y otros trabajos en mi web.');
      window.document.querySelector('meta[name="twitter:description"]').setAttribute("content",'Ver este y otros trabajos en mi web.');
      /* og:url */
      window.document.querySelector('meta[property="og:url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/folder/${folder.label}/${folder.route_title}`);
      /* og:image default */
      window.document.querySelector('meta[property="og:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", `${process.env.REACT_APP_FRONTEND}/heart.png`);
      if ('images' in folder) {
        let metaImg = folder.images[0].url;
        window.document.querySelector('meta[property="og:image"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[name="twitter:image:secure_url"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[name="twitter:image"]').setAttribute("content", metaImg);
        window.document.querySelector('meta[property="og:image:width"]').setAttribute("content", 871);
        window.document.querySelector('meta[property="og:image:height"]').setAttribute("content", 564);
      }
      if ('description' in folder) {
        window.document.querySelector('meta[name="description"]').setAttribute("content", folder.description);
        window.document.querySelector('meta[name="twitter:description"]').setAttribute("content", folder.description);
      }
    }
    setLoading(true);
    axios.get(`${process.env.REACT_APP_APIHOST}panel/${label}/${title}`, {
      cancelToken: newCancelToken(),
      withCredentials: true,
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setFolder(res.data);
      metaFolder(res.data);
      setLoading(false);
    }).catch((error) => {
      if (isCancel(error)) return;
    });
  }, [label, title, edit]);

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