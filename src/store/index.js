/* eslint-disable one-var */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// import api utilities
import spotifyApUtils from '@/api/providers/spotify/utils';
import spotifyBackendApiUtils from '@/api/providers/spotifyBackend/utils';
import backendApiUtils from '@/api/providers/backend/utils';

// import modules
import user from './user';
import player from './player';
import playback from './playback';
import auth from './auth';
import app from './app';

Vue.use(Vuex);

const persistedState = createPersistedState({
  key: 'ma_state',
  reducer: state => ({
    auth: state.auth,
    app: {
      settings: state.app.settings,
    },
    user: {
      profile: state.user.profile,
    },
  }),
});

/* eslint-disable no-new */
const store = new Vuex.Store({
  strict: true,
  modules: {
    app,
    user,
    player,
    playback,
    auth,
  },
  plugins: [spotifyApUtils, backendApiUtils, spotifyBackendApiUtils, persistedState],
});

export default store;
