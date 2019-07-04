<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.artistInfo',
    :image='getStageImage',
    :subtitle='$tc("artist", 1)',
    :title='response.artistInfo.name',
    :navigation='getNavigation',
    :popularity='response.artistInfo.popularity',
    :info='getInfo')

  // router view
  transition(name='fade', mode='out-in')
    keep-alive
      router-view(:parent-data='response')
</template>

<script>
import {
  getArtistInfo,
  getTopTracks,
  getAlbums,
  getRelatedArtists,
} from '@/api/providers/spotify';

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
        artistInfo: () => getArtistInfo({ id }),
        topTracks: () => getTopTracks({ id }),
        albums: () => getAlbums({ id, type: 'album' }),
        singles: () => getAlbums({ id, type: 'single' }),
        appearsOn: () => getAlbums({ id, type: 'appears_on' }),
        relatedArtists: () => getRelatedArtists({ id }),
      };
    },

    // check if high quality header image is available
    getStageImage() {
      const self = this,
        { artistInfo } = self.response;

      return artistInfo.images;
    },

    // get stage navigation
    getNavigation() {
      const self = this;

      return [{
          title: self.$t('overview'),
          routeName: 'artist',
        },
        {
          title: self.$t('relatedartists'),
          routeName: 'artistRelated',
        }];
    },

    // get stage info
    getInfo() {
      const self = this,
        { artistInfo } = self.response,
        followerCount = artistInfo.followers.total;

      return [{
          value: followerCount.toLocaleString(),
          subtitle: self.$tc('follower', followerCount > 1 ? 0 : 1),
        }];
    },
  },

};
</script>
