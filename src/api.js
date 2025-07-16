// src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://16.170.162.163:4000',
});
