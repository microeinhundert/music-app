/* eslint-disable one-var */
import axios from 'axios';

// register youtube axios instance
const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    /* Insert API key here */
    key: '',
  },
});

const searchVideo = ({ q }) => youtube({
  method: 'get',
  url: '/search',
  params: {
    q,
  },
});

export default searchVideo;
