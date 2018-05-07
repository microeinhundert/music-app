import { getMyProfile, getMyPlaylists } from '@/api/providers/spotify';

const actions = {
  /**
  * Get the current users profile.
  */
  getProfile({ commit }) {
    getMyProfile({ type: 'profile' }).then((res) => {
      const { data } = res;
      commit('SET_PROFILE', { data });
    });
  },

  /**
  * Get the current users playlists.
  */
  getPlaylists({ commit }) {
    getMyPlaylists({ type: 'playlists' }).then((res) => {
      const { data } = res;
      commit('SET_PLAYLISTS', { data });
    });
  },
};

export default actions;
