import axios from 'axios';

const tokenCall = (token) => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}`,
    withCredentials: true,
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
};

const basicCall = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}`
  });
};

class Public {
  constructor() {
    this.https = basicCall();
  }
  home() {
    return this.https.get('public');
  }
  label(label) {
    return this.https.get(`public/${label}`);
  }
  folder(label, name) {
    return this.https.get(`public/${label}/${name}`);
  }
}

/* METODO PARA INGRESAR A LA APP */
const logIn = () => {
  return basicCall.post('panel');
}

class Admin {
  constructor(source) {
    this.https = tokenCall(source);
  }
  label(label) {
    return this.https.get(`panel/items/${label}`);
  }
  folder(label, name) {
    return this.https.get(`panel/items/${label}/${name}`);
  }
  new(data) {
    return this.https.post('panel/new', data);
  }
  newWithImgs(data) {
    return this.https.post('panel/new_with_imgs', data);
  }
  edit(name, data) {
    return this.https.patch(`panel/edit/${name}`, data);
  }
  editWithImgs(name, data) {
    return this.https.patch(`panel/edit_new_imgs/${name}`, data);
  }
  delete(name) {
    return this.https.delete(`panel/delete/${name}`);
  }
}

export {Public, logIn, Admin};