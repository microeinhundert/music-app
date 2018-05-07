<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.history',
    :image='response.history.items[0].track.album.images',
    :subtitle='$t("library")',
    :title='$t("recentlyplayed")')

  .o-view__content(v-if='response.history')
    // tracks
    ma-section(:actions='false')

      ma-list(
        slot='list'
        v-for='(history, index) in response.history.items',
        :key='index',
        :image='history.track.album.images',
        :title='history.track.name',
        :trackId='history.track.id',
        :artists='history.track.artists',
        :album='history.track.album',
        :explicit='history.track.explicit',
        :popularity='history.track.popularity',
        :duration='history.track.duration_ms',
        :index='index')
</template>

<script>
import { getMyPlaybackHistory } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    lastPlayedArtist() {
      const self = this,
        { history } = self.response,
        [lastPlayedTrack] = history.items,
        lastPlayedArtist = lastPlayedTrack.track.artists[0].id;

      return lastPlayedArtist;
    },

    // get data to fetch from api
    dataToFetch() {
      return {
        history: () => getMyPlaybackHistory({ type: 'track' }),
      };
    },
  },

};
</script>
