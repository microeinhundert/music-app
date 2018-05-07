import actions from './actions';
import mutations from './mutations';

const user = {
  namespaced: true,
  state: {
    profile: {},
    playlists: {},
  },
  actions,
  mutations,
  getters: {
    getCurrentUser: state => state.profile,
    getMarket: state => state.profile.country,
    getCountry: state => state.profile.country,
    getLocale: state => state.profile.country,
    getPlaylists: state => state.playlists.items,
  },
};

export default user;
