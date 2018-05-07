const mutations = {
  /**
  * Push the current playback to state.
  * @param { object } playback Current playback data.
  */
  SET_PLAYBACK(state, playback) {
    const self = state;

    if (playback) self.current = playback;
  },
};

export default mutations;
