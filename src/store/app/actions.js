const actions = {
  /**
  * Initialize the app and user data on initial load.
  */
  initApp({ dispatch, rootGetters }) {
    const accessToken = rootGetters['auth/getAccessToken'];

    if (!accessToken) {
      // redirect to login page
      dispatch('auth/loginUser', null, { root: true });
    } else {
      // init Spotify Web Playback SDK
      dispatch('player/initPlayer', null, { root: true });

      // get current user's profile
      dispatch('user/getProfile', null, { root: true });

      // get current user's playlists
      dispatch('user/getPlaylists', null, { root: true });
    }
  },
};

export default actions;
