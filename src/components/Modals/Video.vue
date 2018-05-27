<template>
  <div
    v-if="modals.video"
    class="c-modal c-modal--fillViewport">

    <div
      v-if="currentPlayback"
      class="c-modal__overlay">

      <!-- video overlay -->
      <div class="c-modal__overlayInner">

        <!-- title -->
        <h1 class="c-modal__overlayTitle">{{ currentPlayback.item.name }}</h1>

        <!-- artists -->
        <div class="c-modal__overlayArtists">

          <router-link
            v-for="artist in currentPlayback.item.artists"
            :key="artist.id"
            :to="{ name: 'artist', params: { id: artist.id }}"
            @click.native="closeModal"
          >{{ artist.name }}</router-link>

        </div>

      </div>

      <!-- close button -->
      <ma-button
        type="overlay"
        icon="close"
        @click.native="closeModal"
      />

    </div>

    <api-request
      :resource="dataToFetch"
      v-model="response"
      spinner=""
      @success="getEmbedURL">

      <!-- iframe -->
      <iframe
        v-if="embedURL"
        :src="embedURL"
        class="c-modal__iframe"
        frameborder="0"
      />

    </api-request>

  </div>
</template>

<script>
import searchVideo from '@/api/providers/youtube';
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

export default {

  data: () => ({
    response: {},
    embedURL: '',
  }),

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
      modals: 'app/getModals',
    }),

    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { currentPlayback } = self,
        title = currentPlayback.item.name,
        artist = currentPlayback.item.artists[0].name;

      return {
        videos: () => searchVideo({ q: `${title} ${artist}` }),
      };
    },
  },

  watch: {
    'modals.video': (isOpen) => {
      const self = this;

      if (isOpen) self.setPlayback({ state: 'pause' });
      else self.setPlayback({ state: 'play' });
    },
  },

  methods: {
    ...mapActions({
      setPlayback: 'playback/setPlayback',
    }),

    ...mapMutations('app', {
      showNotice: 'SET_NOTICE',
      setModal: 'SET_MODAL',
    }),

    // close video modal
    closeModal() {
      const self = this;

      self.setModal({
        video: false,
      });
    },

    // get the youtube embed url
    getEmbedURL() {
      const self = this,
        { response } = self,
        { videoId } = response.videos.items[0].id,
        baseURL = 'https://www.youtube-nocookie.com',
        embedURL = `/embed/${videoId}?`,
        options = {
          autoplay: 1,
          iv_load_policy: 3,
          showinfo: 0,
          controls: 0,
        };

      self.embedURL = baseURL + embedURL + Object.keys(options).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`).join('&');
    },
  },

};
</script>
