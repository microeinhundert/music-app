const actions = {
  /**
  * Initialize Web Playback SDK instance and push the player instance to state.
  * Creates a Spotify Connect playback device.
  */
  initPlayer({ dispatch, rootGetters, commit }) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const currentUser = rootGetters['user/getCurrentUser'],
        /* eslint-disable no-undef */
        instance = new Spotify.Player({
          name: `Music App - ${currentUser.display_name}`,
          volume: 0.5,
          getOAuthToken: (callback) => {
          // Run code to get a fresh access token
            dispatch('auth/getToken', { action: 'refresh' }, { root: true }).then(() => {
              const newToken = rootGetters['auth/getAccessToken'];
              callback(newToken);
            }, { root: true });
          },
        });

      // connect to player
      instance.connect().then(() => {
        commit('SET_PLAYER', { instance });
        dispatch('watchPlayer');
      }).catch((err) => {
        commit('app/SET_NOTICE', {
          action: 'add',
          type: 'error',
          message: `Error: ${err}`,
        }, { root: true });
      });
    };
  },

  /**
  * Watch the current playback and push changes to state.
  */
  watchPlayer({ state: { instance }, dispatch, commit }) {
    dispatch('playback/getPlayback', null, { root: true });

    // add state change listener
    instance.addListener('player_state_changed', () => {
      setTimeout(() => {
        dispatch('playback/getPlayback', null, { root: true });
      }, 500);
    });

    // add error listeners
    instance.addListener('initialization_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
    instance.addListener('authentication_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
    instance.addListener('account_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
    instance.addListener('playback_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
  },

  /**
  * Toggle the playback.
  */
  togglePlayback({ state: { instance } }) {
    instance.togglePlay().catch((err) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message: err }, { root: true });
    });
  },

  /**
  * Seek to position in track,
  * @param { object } payload The function payload.
  * @param { number } payload.position The position to seek to.
  */
  seekTo({ state: { instance }, commit }, { position }) {
    if (position) {
      instance.seek(position).catch((err) => {
        commit('app/SET_NOTICE', { action: 'add', type: 'error', message: err }, { root: true });
      });
    }
  },
};

export default actions;
