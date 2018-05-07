const mutations = {
  /**
  * Push the current users profile to state.
  * @param { object } payload The function payload.
  * @param { string } payload.data Profile data to push to state.
  */
  SET_PROFILE(state, { data }) {
    const self = state;

    if (data) {
      self.profile = data;
    }
  },

  /**
  * Push the current users playlists to state.
  * @param { object } payload The function payload.
  * @param { string } payload.data Playlists data to push to state.
  */
  SET_PLAYLISTS(state, { data }) {
    const self = state;

    if (data) {
      self.playlists = data;
    }
  },
};

export default mutations;
