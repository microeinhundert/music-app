<template>
  <div
    id="app"
    :style="getAppStyles"
    class="o-view__app">

    <!-- navigation -->
    <ma-sidebar/>

    <main class="o-view__main u-sidebarMargin">

      <!-- notices -->
      <transition-group name="slide-down-transform">

        <ma-notice
          v-for="(notice, index) in notices"
          :key="index"
          :type="notice.type"
          :message="notice.message"
        />

      </transition-group>

      <!-- header -->
      <ma-header/>

      <!-- router view -->
      <router-view :key="routerKey"/>

    </main>

    <!-- footer -->
    <ma-footer/>

    <!-- music video -->
    <ma-video-modal/>

    <!-- tooltips -->
    <div class="c-tooltips"/>

  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

import maHeader from '@/components/Layout/Header';
import maFooter from '@/components/Layout/Footer';
import maSidebar from '@/components/Layout/Sidebar/';
import maLoading from '@/components/Loader';
import maVideoModal from '@/components/Modals/Video';
import maDeviceSplash from '@/components/Splash/Device';

export default {

  components: {
    maHeader,
    maFooter,
    maSidebar,
    maLoading,
    maVideoModal,
    maDeviceSplash,
  },

  computed: {
    ...mapGetters('app', {
      notices: 'getNotices',
      settings: 'getAppSettings',
    }),

    // get the styles for the app element
    getAppStyles() {
      const self = this,
        { settings } = self;

      return {
        '--accent-color': settings.currentAccentColor,
        '--u-sidebar-margin': `${settings.fixedSidebar ? 350 : 100}px`,
      };
    },

    routerKey() {
      const self = this,
        { name, params } = self.$route,
        key = name === 'search' ? params.searchQuery : params.id;

      return key;
    },
  },

  created() {
    // initialize the app on initial load
    this.initApp();
  },

  methods: {
    ...mapActions({
      initApp: 'app/initApp',
    }),
  },

};
</script>

<style lang='scss'>
@import 'assets/scss/main';
</style>
