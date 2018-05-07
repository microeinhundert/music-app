import { spotifyBackend } from './';

const spotifyBackendApiUtils = ({ getters, dispatch }) => {
  // spotify backend api request interceptor
  spotifyBackend.interceptors.request.use((config) => {
    const { headers } = config,
      accessToken = getters['auth/getSpotifyBackendToken'];

    // add access token to request header
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

    // return the axios config and continue the request
    return config;
  }, null);

  // spotify backend api response interceptor
  spotifyBackend.interceptors.response.use(null, (error) => {
    const { status } = error.response,
      accessToken = getters['auth/getSpotifyBackendToken'];

    if (accessToken) {
      // get a new token when a 401 error occurs while a access token exists
      if (status === 401) dispatch('auth/getBackendToken');
    } else {
      // get a token if no access token exists
      dispatch('auth/getBackendToken');
    }
  });
};

export default spotifyBackendApiUtils;
