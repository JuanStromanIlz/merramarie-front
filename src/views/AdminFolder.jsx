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

  function saveEdit(values) {
    let formToCompare = {
      label: folder.label,
      category: folder.category,
      title: folder.title,
      description: folder.description,
      videoLink: folder.videoLink
    };
    let newForm = values;
    for (let propName in newForm) {
      console.log((newForm[propName] === formToCompare[propName]) + ` ${propName}`)
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
    {edit ?
    <EditFolder folder={folder} sendEdit={saveEdit}/> :
    <h1>{folder.title}</h1>}
    </>
  );
};

export default AdminFolder;