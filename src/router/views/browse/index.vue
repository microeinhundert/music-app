<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    :image='currentUser.images',
    :subtitle='$t("browse")',
    :title='greeting',
    :navigation='getNavigation')

  // router view
  transition(name='fade', mode='out-in')
    keep-alive
      router-view(:parent-data='response')
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getFeaturedPlaylists,
  getNewReleases,
  getCharts,
  getCategories,
} from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    ...mapGetters('user', {
      currentUser: 'getCurrentUser',
    }),

    // get data to fetch from api
    dataToFetch() {
      return {
        featured: () => getFeaturedPlaylists(),
        releases: () => getNewReleases(),
        charts: () => getCharts(),
        categories: () => getCategories(),
      };
    },

    // get stage navigation
    getNavigation() {
      const self = this;

      return [{
        title: self.$t('overview'),
        routeName: 'browse',
      },
      {
        title: self.$t('charts'),
        routeName: 'browseCharts',
      },
      {
        title: self.$tc('category', 0),
        routeName: 'browseCategories',
      },
      {
        title: self.$t('newreleases'),
        routeName: 'browseReleases',
      },
      {
        title: self.$t('discover'),
        routeName: 'browseDiscover',
      }];
    },

    // greeting depending on time of day
    greeting() {
      const self = this,
        fullName = self.currentUser.display_name,
        firstName = fullName.split(' ')[0],
        hour = new Date().getHours();

      let greeting;

      if (hour >= 5 && hour < 12) greeting = self.$t('greetings.morning');
      else if (hour >= 12 && hour < 18) greeting = self.$t('greetings.afternoon');
      else if (hour >= 18 && hour < 23) greeting = self.$t('greetings.evening');
      else greeting = self.$t('greetings.night');

      return `${greeting} ${firstName}`;
    },
  },

};
</script>
