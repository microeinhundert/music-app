<template>
  <aside
    v-on-clickaway="closePanel"
    class="c-sidebar">
    <div class="c-sidebar__inner">

      <!-- primary navigation -->
      <ul class="c-sidebar__panelSelect">

        <li
          v-for="(item, index) in panels"
          :key="index"
          :class="[`c-sidebar__selectItem--${item.name}`, { 'is-active' : index === activePanel && isPanelOpen }]"
          class="c-sidebar__selectItem"
          @click="togglePanel(index)"
        >

          <!-- icon -->
          <a
            v-if="item.icon"
            class="c-sidebar__selectItemIcon">

            <ma-icon :hover="true">{{ item.icon }}</ma-icon>

          </a>

          <!-- user avatar -->
          <div
            v-else
            class="c-sidebar__selectItemAvatar">

            <img
              v-if="currentUser.images"
              :src="currentUser.images[0].url"
              :alt="currentUser.display_name"
              class="c-sidebar__selectItemAvatarImage"
            >

          </div>
        </li>

      </ul>

    </div>

    <!-- sidebar panel -->
    <transition name="slide-right-transform">
      <div
        v-if="isPanelOpen"
        :class="{ 'is-fixed' : settings.fixedSidebar }"
        class="c-sidebarPanel"
      >

        <!-- fixed sidebar toggle -->
        <a
          class="c-sidebarPanel__fixedToggle"
          @click="toggleFixedSidebar">

          <ma-icon
            :hover="true"
            type="small"
          >{{ settings.fixedSidebar ? 'lock' : 'lock_open' }}</ma-icon>

        </a>

        <transition
          name="fade"
          mode="out-in">

          <!-- panel content -->
          <div
            v-for="(panel, index) in panels"
            v-if="activePanel === index"
            ref="panelInner"
            :key="index"
            class="c-sidebarPanel__inner"
          >

            <!-- component -->
            <component
              :is="panel.component"
              :key="index"
              @close-panel="closePanel"
            />

          </div>

        </transition>

        <!-- expanded album cover -->
        <transition name="slide-up-margin">

          <div
            v-if="settings.largeCover"
            class="c-sidebarPanel__cover">

            <!-- large cover close button -->
            <ma-button
              type="overlay"
              icon="close"
              @click.stop.native="setAppSettings({ largeCover: false })"
            />

            <!-- cover image -->

            <router-link
              :to="{ name: 'artist', params: { id: currentPlayback.item.artists[0].id }}"
              class="c-sidebarPanel__coverLink">
              <img
                :src="currentPlayback.item.album.images[0].url"
                :alt="currentPlayback.item.name"
                class="c-sidebarPanel__coverImage"
              >
            </router-link>

          </div>

        </transition>
      </div>
    </transition>
  </aside>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

import { directive as onClickaway } from 'vue-clickaway';

// import views
import user from './views/_user';
import browse from './views/_browse';
import playlists from './views/_playlists';
import newplaylist from './views/_newplaylist';

export default {

  directives: {
    onClickaway,
  },

  data: () => ({
    activePanel: false,
    panels: [{
      name: 'user',
      component: user,
    },
    {
      name: 'browse',
      icon: 'music_note',
      component: browse,
    },
    {
      name: 'playlists',
      icon: 'playlist_play',
      component: playlists,
    },
    {
      name: 'newplaylist',
      icon: 'playlist_add',
      component: newplaylist,
    },
    ],
  }),

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
      currentUser: 'user/getCurrentUser',
      playlists: 'user/getPlaylists',
      settings: 'app/getAppSettings',
    }),

    // check if panel currently open
    isPanelOpen() {
      const self = this,
        isOpen = self.settings.fixedSidebar || self.activePanel;
      return isOpen;
    },
  },

  created() {
    // activePanel defaults to 0 if sidebar is fixed
    this.activePanel = this.settings.fixedSidebar ? 1 : false;
  },

  methods: {
    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    // toggle the fixed sidebar
    toggleFixedSidebar() {
      const self = this;

      self.setAppSettings({
        fixedSidebar: !self.settings.fixedSidebar,
      });
    },

    // toggle the panel
    togglePanel(panel) {
      const self = this,
        { fixedSidebar } = self.settings;

      if (self.activePanel === panel && !fixedSidebar) {
        self.activePanel = false;
      } else if (typeof panel === 'number') {
        self.activePanel = panel;
      }
    },

    // close the panel
    closePanel() {
      const self = this,
        { fixedSidebar } = self.settings;

      if (self.activePanel && !fixedSidebar) {
        self.activePanel = false;
      }
    },
  },

};
</script>
