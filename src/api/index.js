import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueApiRequest from 'vue-api-request';
import loader from '@/components/Loader';
import store from '@/store';

// register axios
Vue.use(VueAxios, axios);

// register loader
VueApiRequest.addLoader('ma-loader', loader);

// options for api-request plugin
const options = {
  resp: 'data',
  spinner: 'ma-loader',
  effect: '',
  onError: (err) => {
    store.commit('app/SET_NOTICE', {
      action: 'add',
      type: 'error',
      message: `Error: ${err.message}.`,
    });
  },
};

// register api-request plugin
Vue.use(VueApiRequest, options);
