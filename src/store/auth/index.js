import actions from './actions';
import mutations from './mutations';

const auth = {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
    expiryTime: ''
  },
  actions,
  mutations,
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
    getExpiryTime: state => state.expiryTime,
  },
};

export default auth;
