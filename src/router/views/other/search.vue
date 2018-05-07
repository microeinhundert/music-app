<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.results',
    :image='getStageImage',
    :subtitle='$tc("search", 1)',
    :title='`${$t("resultsfor")} "${$route.params.searchQuery}"`')

  .o-view__content(v-if='response.results')
    // tracks
    ma-section(
      v-if='response.results.tracks',
      :title='$tc("track", 0)',
      :subtitle='$t("showingxresults", { count: getCount("tracks"), total: getTotalCount("tracks") })')

      ma-list(
        slot='list',
        v-for='(track, index) in response.results.tracks.items',
        :key='track.id',
        :trackId='track.id',
        :image='track.album.images',
        :title='track.name',
        :artists='track.artists',
        :album='track.album',
        :explicit='track.explicit',
        :popularity='track.popularity',
        :duration='track.duration_ms',
        :index='index')

    // albums
    ma-section(
      v-if='response.results.albums',
      :title='$tc("album", 0)',
      :subtitle='$t("showingxresults", { count: getCount("albums"), total: getTotalCount("albums") })')

      ma-box(
        slot='boxes',
        v-for='album in response.results.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images',
        :title='album.name',
        :artists='album.artists')

    // artists
    ma-section(
      v-if='response.results.artists',
      :title='$tc("artist", 0)',
      :subtitle='$t("showingxresults", { count: getCount("artists"), total: getTotalCount("artists") })')

      ma-box(
        slot='boxes',
        v-for='artist in response.results.artists.items',
        :key='artist.id',
        :type='artist.type',
        :title='artist.name',
        :image='artist.images',
        :primaryid='artist.id')
</template>


<script>
import { getSearchResults } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { searchQuery } = self.$route.params,
        { type } = self.$route.query;

      return {
        results: () => getSearchResults({ type: type || 'album,artist,track', searchQuery }),
      };
    },

    // get the stage image
    getStageImage() {
      const self = this,
        { tracks, albums, artists } = self.response.results;

      let stageImage;

      if (tracks) stageImage = tracks.items[0].album.images;
      else if (albums) stageImage = albums.items[0].images;
      else if (artists) stageImage = artists.items[0].images;

      return stageImage;
    },
  },

  methods: {
    // get item count from response
    getCount(type) {
      const self = this,
        data = self.response.results[type],
        count = data.items.length;

      return count.toLocaleString();
    },

    // get total item count from response
    getTotalCount(type) {
      const self = this,
        data = self.response.results[type],
        totalCount = data.total;

      return totalCount.toLocaleString();
    },
  },

};
</script>
