import axios from 'axios';
import {getLoggedUser} from '../utils/userUtils';

const api = axios.create({
  baseURL: 'https://us-central1-nwsoft-2baf8.cloudfunctions.net/nwsoft/',
});
api.interceptors.request.use(async config => {
  let user = await getLoggedUser();
  if (user.token) {
    config.headers.Authorization = user.token;
  }
  return config;
});
export default api;
