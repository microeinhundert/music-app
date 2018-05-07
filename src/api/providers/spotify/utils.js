import { spotify } from './';

const spotifyApiUtils = ({ getters, dispatch }) => {
  // spotify api request interceptor
  spotify.interceptors.request.use((config) => {
    const { headers, params } = config,
      accessToken = getters['auth/getAccessToken'];

    // add access token to request header
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

    if (params) {
      // get all params of type string
      const stringParams = Object.keys(params).filter(key => typeof params[key] === 'string');

      // replace params with getter when store is available
      stringParams.forEach((key) => {
        const item = params[key],
          getterArray = item.split('getters/'),
          isGetter = typeof item === 'string' && getterArray.length > 1;

        if (isGetter) params[key] = getters[getterArray[1]];
      });
    }

    // return the axios config and continue the request
    return config;
  }, null);

  // spotify api response interceptor
  spotify.interceptors.response.use(null, (error) => {
    const { status } = error.response,
      accessToken = getters['auth/getAccessToken'];

    if (accessToken) {
      // refresh the token when a 401 error occurs while a access token exists
      if (status === 401) dispatch('auth/refreshToken');
    } else {
      // login the user if no access token exists
      dispatch('auth/loginUser');
    }
  });
};

export default spotifyApiUtils;
