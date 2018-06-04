<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.albums',
    :image='response.albums.items[0].album.images',
    :subtitle='$t("library")',
    :title='$tc("album", 0)',
    :info='getInfo')

  .o-view__content(v-if='response.albums')
    // albums
    ma-section(:actions='false')

      ma-box(
        slot='boxes'
        v-for='item in response.albums.items',
        :key='item.album.id',
        :primaryid='item.album.id',
        :image='item.album.images',
        :title='item.album.name',
        :artists='item.album.artists')
</template>

<script>
import { getMyProfileData } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      return {
        albums: () => getMyProfileData({ type: 'albums' }),
      };
    },

    // get stage info
    getInfo() {
      const self = this,
        { albums } = self.response,
        albumCount = albums.total;

      return [{
        value: albumCount,
        subtitle: self.$tc('album', albumCount === 1 ? 1 : 0),
      }];
    },
  },

};
</script>
