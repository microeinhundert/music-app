<template>
  <div class="c-sidebarPanel__parent">

    <maPanelList
      :items="playlists"
      @item-click="$emit('close-panel')"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import maPanelList from '@/components/PanelList';

export default {

  components: {
    maPanelList,
  },

  computed: {
    ...mapGetters('user', {
      playlists: 'getPlaylists',
    }),
  },

};
</script>
