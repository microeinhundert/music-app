import actions from './actions';
import mutations from './mutations';

const player = {
  namespaced: true,
  state: {
    instance: {},
  },
  actions,
  mutations,
  getters: {
    getPlayer: state => state.instance,
    /* eslint-disable dot-notation */
    getDeviceId: state => state.instance['_options'].id,
  },
};

export default player;
