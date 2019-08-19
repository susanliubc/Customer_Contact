import axios from 'axios';

const setAuthToken = token => {
  token
    ? (axios.defaults.headers.common['x-auth-token'] = token)
    : delete axios.defaults.headers.common['x-auth-token'];
};

export default setAuthToken;
