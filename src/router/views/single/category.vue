<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.categoryInfo',
    :subtitle='$tc("category", 1)',
    :title='response.categoryInfo.name')

  .o-view__content(v-if='response.category')
    // tracks
    ma-section(:actions='false')

      ma-box(
        slot='boxes'
        v-for='playlist in response.category.playlists.items',
        :key='playlist.id',
        :type='playlist.type',
        :primaryid='playlist.id',
        :secondaryid='playlist.owner.id',
        :image='playlist.images',
        :title='playlist.name')
</template>

<script>
import { getCategoryInfo, getCategoryPlaylists } from '@/api/providers/spotify';

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
        categoryInfo: () => getCategoryInfo({ id }),
        category: () => getCategoryPlaylists({ id }),
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
