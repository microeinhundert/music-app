import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
});

// router navigation guard
router.beforeEach((to, from, next) => {
  const { getters, dispatch } = store,
    accessToken = getters['auth/getAccessToken'];

  if (!accessToken) {
    // prevent route navigation
    next(false);
    // login the user
    dispatch('auth/LOGIN_USER');
  }
  // go to next route
  next();
});

export default router;
