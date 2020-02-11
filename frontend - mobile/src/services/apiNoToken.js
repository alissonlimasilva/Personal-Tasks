import axios from 'axios';

const apiNoToken = axios.create({
  baseURL: 'https://us-central1-nwsoft-2baf8.cloudfunctions.net/nwsoft/',
});

export default apiNoToken;
