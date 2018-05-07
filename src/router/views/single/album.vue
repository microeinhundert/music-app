<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.album',
    :image='response.album.images',
    :subtitle='response.album.album_type',
    :title='response.album.name',
    :profile='response.album.artists',
    :info='getInfo')

  .o-view__content(v-if='response.album')
    // tracks
    ma-section(:copyright='response.album.copyrights[0].text', :actions='false')

      ma-list(
        slot='list'
        v-for='(track, index) in response.album.tracks.items',
        :key='track.id',
        :title='track.name',
        :trackId='track.id',
        :explicit='track.explicit',
        :popularity='track.popularity',
        :duration='track.duration_ms',
        :index='index')
</template>

<script>
import { getAlbum } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { id } = self.$route.params;

      return {
        album: () => getAlbum({ id }),
      };
    },

    // get stage info
    getInfo() {
      const self = this,
        { album } = self.response,
        trackCount = album.tracks.total,
        releaseDate = new Date(album.release_date);

      return [{
        value: releaseDate.toLocaleDateString(),
        subtitle: self.$t('released'),
      },
      {
        value: trackCount,
        subtitle: self.$tc('track', trackCount === 1 ? 1 : 0),
      }];
    },
  },

};
</script>
