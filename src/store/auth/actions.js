import { getAuthURL, getAccessToken, refreshAccessToken } from '@/api/providers/backend';

const actions = {
  /**
  * Redirect the user to external spotify login page.
  */
  loginUser({ state }) {
    const { protocol, host } = window.location;

    if (!state.accessToken) {
      getAuthURL({ protocol, host }).then((res) => {
        window.location.href = res.data.url;
      });
    }
  },

  /**
  * Call the backend api and get an access token.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  */
  getToken({ commit }, { code }) {
    if (code) {
      getAccessToken({ code }).then((res) => {
        commit('SET_CREDENTIALS', res.data);
      }).catch((err) => {
        commit('app/SET_NOTICE', {
          action: 'add',
          type: 'error',
          message: `Error: ${err}`,
        }, { root: true });
      });
    }
  },

  /**
  * Call the backend api and refresh the access token.
  */
  refreshToken({ getters, commit }) {
    const refreshToken = getters.getRefreshToken;

    if (refreshToken) {
      refreshAccessToken({ refreshToken }).then((res) => {
        commit('SET_CREDENTIALS', res.data);
      }).catch((err) => {
        commit('app/SET_NOTICE', {
          action: 'add',
          type: 'error',
          message: `Error: ${err}`,
        }, { root: true });
      });
    }
  },
};

export default actions;
