const mutations = {
  /**
  * Push credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.accessToken The spotify api access token.
  * @param { string } payload.refreshToken The spotify api refresh token.
  * @param { number } payload.expiresIn The duration in seconds that the token is valid..
  */
  SET_CREDENTIALS(state, payload) {
    const self = state;

    Object.keys(payload).forEach((key) => {
      self[key] = payload[key];
    });
  },
};

export default mutations;
