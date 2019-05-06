/* eslint-disable one-var */
import axios from 'axios';

// register spotify backend axios instance
export const spotifyBackend = axios.create({
  /* Insert base URL here if you use this API */
  baseURL: '',
});

export const getAdditionalArtistInfo = ({ id }) => spotifyBackend({
  method: 'get',
  url: `/artists/${id}`,
});
