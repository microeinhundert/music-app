<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.tracks',
    :image='response.tracks.items[0].track.album.images',
    :subtitle='$t("library")',
    :title='$tc("track", 0)',
    :info='getInfo')

  .o-view__content(v-if='response.tracks')
    // tracks
    ma-section(:actions='false')

      ma-list(
        slot='list'
        v-for='(item, index) in response.tracks.items',
        :key='item.track.id',
        :image='item.track.album.images',
        :title='item.track.name',
        :trackId='item.track.id',
        :artists='item.track.artists',
        :album='item.track.album',
        :explicit='item.track.explicit',
        :popularity='item.track.popularity',
        :duration='item.track.duration_ms',
        :index='index')
</template>

<script>
import { getMyProfile } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      return {
        tracks: () => getMyProfile({ type: 'tracks' }),
      };
    },

    // get stage info
    getInfo() {
      const self = this,
        { tracks } = self.response,
        trackCount = tracks.total;

      return [{
        value: trackCount,
        subtitle: self.$tc('track', trackCount === 1 ? 1 : 0),
      }];
    },
  },

};
</script>
