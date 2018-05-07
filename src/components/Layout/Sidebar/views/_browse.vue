<template>
  <api-request
    :resource="dataToFetch"
    v-model="response"
    class="c-sidebarPanel__parent"
    spinner=""
  >

    <maPanelList
      v-if="response.albums"
      :items="listItems"
      @item-click="$emit('close-panel')"
    />

  </api-request>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getFeaturedPlaylists,
  getMyPlaybackHistory,
  getMyProfile,
} from '@/api/providers/spotify';

import maPanelList from '@/components/PanelList';

export default {

  components: {
    maPanelList,
  },

  data: () => ({
    response: {},
  }),

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
    }),

    // get items for list
    listItems() {
      const self = this,
        { response } = self,
        featuredMessage = response.featured.message,
        trackCount = response.tracks.total,
        albumCount = response.albums.total,
        lastPlayedArtist = response.history.items[0].track.artists[0].name;

      return [{
        name: 'browse',
        routeName: 'browse',
        meta: featuredMessage,
      },
      {
        name: 'recentlyplayed',
        routeName: 'mylibraryHistory',
        meta: lastPlayedArtist,
      },
      {
        name: 'track',
        routeName: 'mylibraryTracks',
        meta: `${trackCount} ${self.$tc('track', trackCount === 1 ? 1 : 0)}`,
      },
      {
        name: 'album',
        routeName: 'mylibraryAlbums',
        meta: `${albumCount} ${self.$tc('album', albumCount === 1 ? 1 : 0)}`,
      }];
    },

    // get data to fetch from api
    dataToFetch() {
      return {
        featured: () => getFeaturedPlaylists(),
        history: () => getMyPlaybackHistory({ type: 'track' }),
        tracks: () => getMyProfile({ type: 'tracks' }),
        albums: () => getMyProfile({ type: 'albums' }),
      };
    },
  },

};
</script>
