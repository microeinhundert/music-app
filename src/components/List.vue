<template>
  <li
    :class="{ 'is-playing' : isCurrentlyPlaying }"
    class="c-list"
    @dblclick="setPlayback({ state: 'play', trackId })">

    <!-- image -->
    <div
      v-if="image[0]"
      class="c-list__image">

      <!-- play icon over image -->
      <a
        class="c-list__playbackToggle"
        @click="setPlayback({ state: isCurrentlyPlaying ? 'pause' : 'play', trackId })">

        <ma-icon type="small">{{ isCurrentlyPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}</ma-icon>

      </a>

      <img
        v-lazy="image[0].url"
        :alt="title"
        class="c-list__coverImage"
      >

    </div>

    <div class="c-list__info">

      <!-- playing icon -->
      <span
        v-if="isCurrentlyPlaying"
        class="c-list__playingIcon">

        <ma-icon type="small">{{ isPlaying ? 'volume_up' : 'volume_down' }}</ma-icon>

      </span>

      <!-- index -->
      <span
        v-else
        class="c-list__index">{{ formatIndex(index) }}</span>

    </div>

    <!-- meta -->
    <div class="c-list__meta">

      <!-- title -->
      <span class="c-list__title">{{ title }}</span>

      <!-- artists -->
      <div
        v-if="artists"
        class="c-list__artists">

        <router-link
          v-for="artist in artists"
          :key="artist.id"
          :to="{ name: artist.type, params: { id: artist.id }}"
        >{{ artist.name }}</router-link>

      </div>

    </div>

    <!-- labels -->
    <div
      v-if="explicit || popularity"
      class="c-list__labels">

      <!-- icon if popular -->
      <span
        v-tooltip="{ content: $t('popular') }"
        v-if="popularity && popularity > 80">
        <ma-icon :hover="true">stars</ma-icon>
      </span>

      <!-- icon if explicit -->
      <span
        v-tooltip="{ content: $t('explicit') }"
        v-if="explicit">
        <ma-icon :hover="true">explicit</ma-icon>
      </span>

    </div>

    <!-- album name -->
    <div
      v-if="album"
      class="c-list__album">
      <router-link :to="{ name: album.type, params: { id: album.id }}">{{ album.name }}</router-link>
    </div>

    <!-- duration -->
    <span class="c-list__duration">{{ formatTime(duration) }}</span>

    <!-- actions -->
    <div class="c-list__actions">

      <!-- add to playlist -->
      <a v-tooltip="{ content: $t('addtoplaylist') }">
        <ma-icon :hover="true">playlist_add</ma-icon>
      </a>

      <!-- more options -->
      <a v-tooltip="{ content: $t('more') }">
        <ma-icon :hover="true">more_horiz</ma-icon>
      </a>
    </div>

  </li>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {

  props: {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artists: {
      type: Array,
      default: () => [],
    },
    album: {
      type: Object,
      default: () => {},
    },
    duration: {
      type: Number,
      required: true,
    },
    trackId: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: () => [],
    },
    explicit: {
      type: Boolean,
      default: false,
    },
    popularity: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapGetters('playback', {
      currentPlayback: 'getCurrentPlayback',
      isPlaying: 'getPlayingState',
    }),

    // check if track is currently playing
    isCurrentlyPlaying() {
      const self = this,
        isPlayingTrack = self.currentPlayback ? (self.currentPlayback.item.id === self.trackId) : false,
        isHistoryView = self.$route.path === '/history',
        isCurrentlyPlaying = isPlayingTrack && !isHistoryView;

      return isCurrentlyPlaying;
    },
  },

  methods: {
    ...mapActions({
      setPlayback: 'playback/setPlayback',
    }),

    // format index to 2 digits
    formatIndex(value) {
      const index = value + 1,
        formattedIndex = (`0${index}`).slice(-2);

      return formattedIndex;
    },

    // time to human readable
    formatTime(value) {
      let time = value;
      const minutes = Math.floor(value / 60000),
        seconds = ((value % 60000) / 1000).toFixed(0);

      if (typeof time === 'number') time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      return time;
    },
  },

};
</script>
