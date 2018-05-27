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
import { mapGetters } from 'vuex';
import { getAdditionalArtistInfo } from '@/api/providers/spotifyBackend';
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
    ...mapGetters('auth', {
      spotifyBackendToken: 'getSpotifyBackendToken',
    }),

    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { id } = self.$route.params;

      let dataToFetch = {
        artistInfo: () => getArtistInfo({ id }),
        topTracks: () => getTopTracks({ id }),
        albums: () => getAlbums({ id, type: 'album' }),
        singles: () => getAlbums({ id, type: 'single' }),
        appearsOn: () => getAlbums({ id, type: 'appears_on' }),
        relatedArtists: () => getRelatedArtists({ id }),
      };

      if (self.spotifyBackendToken) {
        dataToFetch = Object.assign({
          additionalArtistInfo: () => getAdditionalArtistInfo({ id }),
        }, dataToFetch);
      }

      return dataToFetch;
    },

    // check if high quality header image is available
    getStageImage() {
      const self = this,
        { artistInfo, additionalArtistInfo } = self.response;

      let stageImage;

      if (additionalArtistInfo) stageImage = additionalArtistInfo.headerImages;
      else if (artistInfo) stageImage = artistInfo.images;

      return stageImage;
    },

    // get stage navigation
    getNavigation() {
      const self = this,
        navigation = [{
          title: self.$t('overview'),
          routeName: 'artist',
        },
        {
          title: self.$t('relatedartists'),
          routeName: 'artistRelated',
        }];

      if (self.spotifyBackendToken) {
        navigation.push({
          title: self.$t('about'),
          routeName: 'artistAbout',
        });
      }

      return navigation;
    },

    // get stage info
    getInfo() {
      const self = this,
        { artistInfo, additionalArtistInfo } = self.response,
        followerCount = artistInfo.followers.total,
        info = [{
          value: followerCount.toLocaleString(),
          subtitle: self.$tc('follower', followerCount > 1 ? 0 : 1),
        }];

      if (self.spotifyBackendToken) {
        const listenerCount = additionalArtistInfo.artistInsights.monthly_listeners;

        info.unshift({
          value: listenerCount.toLocaleString(),
          subtitle: self.$tc('monthlylisteners', 0),
        });
      }

      return info;
    },
  },

};
</script>
