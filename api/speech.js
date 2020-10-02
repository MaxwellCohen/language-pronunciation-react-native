import axios from 'axios';

export const baseURL =
  'https://cmca67rw14.execute-api.us-east-1.amazonaws.com/dev';

export default axios.create({
  baseURL: baseURL,
});
