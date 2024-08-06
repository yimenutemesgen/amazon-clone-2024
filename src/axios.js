


import axios from 'axios';

const instance = axios.create({
  baseURL: ("http://127.0.0.1:5001/new-290a3/us-central1/api"), // Replace with your API base URL
});

export default instance;

