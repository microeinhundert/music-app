<template>
  <footer
    v-if="currentPlayback"
    class="c-footer">

    <!-- current playback -->
    <div
      :class="{ 'is-coverHidden' : settings.largeCover }"
      class="c-footer__inner c-footer__inner--left">

      <!-- cover -->
      <div class="c-footer__cover">

        <!-- large cover button -->
        <ma-button
          type="overlay"
          icon="keyboard_arrow_up"
          @click.native="setAppSettings({ largeCover: true })"
        />

        <!-- cover image -->
        <img
          v-lazy="currentPlayback.item.album.images[0].url"
          :alt="currentPlayback.item.name"
          class="c-footer__coverImage"
        >

      </div>


      <div class="c-footer__playback">

        <!-- title -->
        <router-link
          :to="{ name: 'album', params: { id: currentPlayback.item.album.id }}"
          class="c-footer__playbackTitle"
        >

          {{ currentPlayback.item.name }}

        </router-link>

        <div
          v-if="currentPlayback.item.artists"
          class="c-footer__playbackArtists">

          <!-- artists -->
          <router-link
            v-for="artist in currentPlayback.item.artists"
            :key="artist.id"
            :to="{ name: 'artist', params: { id: artist.id }}"
          >

            {{ artist.name }}

          </router-link>

        </div>

      </div>
      <transition name="fade">
        <div
          v-show="!settings.largeCover"
          class="c-footer__background">
          <img
            v-lazy="currentPlayback.item.album.images[0].url"
            :alt="currentPlayback.item.name"
            class="c-footer__backgroundImage" >
        </div>
      </transition>
    </div>

    <!-- playback controls -->
    <div class="c-footer__inner c-footer__inner--middle">

      <div class="c-footer__playbackControls">

        <!-- shuffle icon -->
        <a
          v-tooltip="{ content: $t('shuffle') }"
          class="c-footer__controlsShuffle"
          @click="setShuffle">
          <ma-icon
            :hover="true"
            :class="{ 'active': currentPlayback.shuffle_state }"
          >

            shuffle

          </ma-icon>
        </a>

        <!-- skip icon -->
        <a
          class="c-footer__controlsSkip"
          @click="skipTo({ direction: 'previous' })">
          <ma-icon :hover="true">

            skip_previous

          </ma-icon>
        </a>

        <!-- playback toggle icon -->
        <a
          class="c-footer__controlsToggle"
          @click="togglePlayback">
          <ma-icon
            :hover="true"
            type="toggle"
          >

            {{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

          </ma-icon>
        </a>

        <!-- skip icon -->
        <a
          class="c-footer__controlsSkip"
          @click="skipTo({ direction: 'next' })">
          <ma-icon :hover="true">

            skip_next

          </ma-icon>
        </a>

        <!-- repeat icon -->
        <a
          v-tooltip="{ content: $t('repeat') }"
          class="c-footer__controlsRepeat"
          @click="toggleRepeat">
          <ma-icon
            :hover="true"
            :class="{ 'active': currentPlayback.repeat_state == 'context' }"
          >

            repeat

          </ma-icon>
        </a>

      </div>
    </div>

    <!-- other controls -->
    <div class="c-footer__inner c-footer__inner--right">

      <!-- video icon -->
      <a
        v-tooltip="{ content: $t('watchvideo') }"
        @click="openVideoModal">
        <ma-icon :hover="true">

          music_video

        </ma-icon>
      </a>

      <!-- playback time -->
      <div class="c-footer__playbackTime">
        <span class="c-footer__playbackTimeProgress">{{ trackProgress }}</span>
        <span class="c-footer__playbackTimeDuration">{{ trackDuration }}</span>
      </div>

    </div>

    <!-- progress bar -->
    <div
      ref="progressContainer"
      class="c-footer__playbackProgress"
      @click="jumpToProgress"
    >

      <progress
        ref="progressBar"
        :max="duration"
        class="c-footer__playbackProgressBar"
      />

    </div>

  </footer>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

import { TweenLite, Linear } from 'gsap';

export default {

  data: () => ({
    currentProgress: 0,
    progressInterval: null,
  }),

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
      settings: 'app/getAppSettings',
      duration: 'playback/getDuration',
      progress: 'playback/getProgress',
      isPlaying: 'playback/getPlayingState',
    }),

    // get human readable track progress
    trackProgress() {
      const self = this,
        minutes = Math.floor(self.currentProgress / 60000),
        seconds = ((self.currentProgress % 60000) / 1000).toFixed(0);

      return self.currentProgress >= 0 ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` : 0;
    },

    // get human readable track duration
    trackDuration() {
      const self = this,
        minutes = Math.floor(self.duration / 60000),
        seconds = ((self.duration % 60000) / 1000).toFixed(0);

      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },

  watch: {
    // watch the progress and update it when it changes
    progress() {
      this.updateProgress();
    },

    // watch the playback state and start / stop the interval accordingly
    isPlaying() {
      this.updateProgress();
    },

    // reset timeout when playback is at the end of the track
    currentProgress(value) {
      const self = this,
        { progressBar } = self.$refs;

      TweenLite.to(progressBar, 1, {
        attr: {
          value,
        },
        ease: Linear.easeNone,
      });

      if (value >= self.duration) {
        clearInterval(self.progressInterval);
      }
    },
  },

  created() {
    this.updateProgress();
  },

  methods: {
    ...mapActions({
      skipTo: 'playback/skipTo',
      seekTo: 'player/seekTo',
      toggleRepeat: 'playback/toggleRepeat',
      setShuffle: 'playback/setShuffle',
      togglePlayback: 'player/togglePlayback',
    }),

    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
      setModal: 'SET_MODAL',
    }),

    // add one second to the progress every second
    updateProgress() {
      const self = this,
        // half a second in milliseconds
        oneSecond = 1000;

      // clear the interval before starting a new one
      clearInterval(self.progressInterval);

      // set local progress to current progress from the api
      self.currentProgress = self.progress;

      if (self.isPlaying) {
        // count up 500 milliseconds every 500 milliseconds
        self.progressInterval = setInterval(() => {
          self.currentProgress += oneSecond;
        }, oneSecond);
      }
    },

    // jump to progress
    jumpToProgress(event) {
      const self = this,
        { progressContainer } = self.$refs,
        progressBarWidth = progressContainer.offsetWidth,
        clickedPosition = (event.clientX / progressBarWidth) * 100,
        position = Math.round((self.duration / 100) * clickedPosition);

      if (position) {
        self.seekTo({
          position,
        }).then(() => {
          self.currentProgress = position;
        });
      }
    },

    openVideoModal() {
      const self = this;

      self.setModal({ video: true });
    },
  },

};
</script>
