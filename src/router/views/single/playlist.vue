<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.playlist',
    :image='response.playlist.images',
    :subtitle='$tc("playlist", 1)',
    :title='response.playlist.name',
    :info='getInfo',
    :profile='response.playlist.owner',
    :meta='response.playlist.description')

  .o-view__content(v-if='response.playlist')
    // tracks
    ma-section(:actions='false')

      ma-list(
        slot='list'
        v-for='(playlist, index) in response.playlist.tracks.items',
        :key='playlist.track.id',
        :trackId='playlist.track.id',
        :image='playlist.track.album.images',
        :title='playlist.track.name',
        :artists='playlist.track.artists',
        :album='playlist.track.album',
        :explicit='playlist.track.explicit',
        :popularity='playlist.track.popularity',
        :duration='playlist.track.duration_ms',
        :index='index')
</template>

<script>
import { getPlaylist } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { owner, id } = self.$route.params;

      return {
        playlist: () => getPlaylist({ owner, id }),
      };
    },

    // get stage info
    getInfo() {
      const self = this,
        { playlist } = self.response,
        trackCount = playlist.tracks.total,
        followerCount = playlist.followers.total;

      return [{
        value: trackCount,
        subtitle: self.$tc('track', trackCount === 1 ? 1 : 0),
      },
      {
        value: followerCount.toLocaleString(),
        subtitle: self.$tc('follower', followerCount === 1 ? 1 : 0),
      }];
    },
  },

};
</script>
