<template>
  <div
    :class="stageClasses"
    class="c-stage">

    <div class="c-stage__inner">

      <!-- cover -->
      <div
        v-if="hasCover"
        class="c-stage__cover">

        <!-- cover image -->
        <img
          v-lazy="image[0].url"
          :alt="title"
          class="c-stage__coverImage" >

      </div>

      <!-- content -->
      <div class="c-stage__content">

        <!-- subtitle -->
        <div class="c-stage__subtitle">

          <h4 v-if="subtitle">

            <span>{{ getProfile ? `${subtitle} ${$t('by')} ` : subtitle }}</span>

            <router-link
              v-if="profile"
              :to="{ name: getProfile.type, params: { id: getProfile.id } }"
              class="c-stage__subtitleLink"
            >{{ getProfile.name || getProfile.display_name }}</router-link>

          </h4>

          <!-- icon if popular -->
          <span
            v-tooltip="{ content: $t('popular') }"
            v-if="popularity && popularity > 80"
            class="c-stage__popularIcon">

            <ma-icon
              :hover="true"
              type="small">stars</ma-icon>

          </span>
        </div>

        <!-- title -->
        <h1
          v-if="title"
          :class="{ 'is-large' : hasLargeTitle }"
          class="c-stage__title"
        >{{ title }}</h1>

        <!-- meta -->
        <div
          v-if="meta"
          class="c-stage__meta">
          <p v-html="formatMeta(meta)"/>
        </div>

        <!-- actions -->
        <div
          v-if="hasActions"
          class="c-stage__actions">

          <!-- play all -->
          <ma-button
            v-if="canPlayAll"
            type="accent"
            icon="play_circle_filled"
          >{{ $t("playall") }}</ma-button>

          <!-- follow / unfollow -->
          <ma-button
            v-tooltip="{ content: isFollowing ? $t('unfollow') : null, offset: 5 }"
            v-if="canFollow"
            :icon="isFollowing ? 'check' : 'add_circle'"
            @click.native="setFollowing"
          >{{ $t(isFollowing ? "following" : "follow") }}</ma-button>

          <!-- save -->
          <ma-button
            v-if="canSave"
            icon="save"
          >{{ $t("save") }}</ma-button>

          <!-- edit -->
          <ma-button
            v-if="canEdit"
            icon="edit"
          >{{ $t("edit") }}</ma-button>

          <!-- info items -->
          <div
            v-if="info"
            class="c-stage__info">
            <div
              v-for="(item, index) in info"
              :key="index"
              class="c-stage__infoItem">

              <!-- info value -->
              <h4 class="c-stage__infoItemValue">{{ item.value }}</h4>

              <!-- info subtitle -->
              <span class="c-stage__infoItemSubtitle">{{ item.subtitle }}</span>

            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- navigation-->
    <ma-navigation
      v-if="navigation.length"
      :items="navigation"/>

    <!-- background image -->
    <div
      v-if="image[0]"
      class="c-stage__background">

      <div
        ref="backgroundInner"
        class="c-stage__backgroundInner">

        <figure
          v-lazy:background-image="image[0].url"
          class="c-stage__backgroundImage"
        />

      </div>

    </div>
  </div>
</template>

<script>
import Rellax from 'rellax';
import { mapGetters } from 'vuex';
import {
  isFollowingArtistOrUser,
  isFollowingPlaylist,
  followArtistOrUser,
  followPlaylist,
} from '@/api/providers/spotify';
import maNavigation from '@/components/Navigation';

export default {

  components: {
    maNavigation,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    image: {
      type: Array,
      default: () => [],
    },
    artist: {
      type: Object,
      default: () => {},
    },
    meta: {
      type: String,
      default: '',
    },
    popularity: {
      type: Number,
      default: null,
    },
    buttons: {
      type: Object,
      default: () => {},
    },
    navigation: {
      type: Array,
      default: () => [],
    },
    profile: {
      type: [Object, Array],
      default: () => {},
    },
    info: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    isFollowing: false,
  }),

  computed: {
    ...mapGetters('user', {
      currentUser: 'getCurrentUser',
    }),

    // stage classes
    stageClasses() {
      const self = this;
      return {
        'is-large': self.isLarge,
        'c-stage--cover': self.hasCover,
        'c-stage--image': self.image.length,
        'c-stage--navigation': self.navigation.length,
      };
    },

    // check if stage is large
    isLarge() {
      const self = this,
        exp = /artist|mylibraryHistory/,
        { name } = self.$route,
        isLarge = exp.test(name);

      return isLarge;
    },

    // count words in title
    titleWordCount() {
      const self = this,
        { title } = self;

      return title.split(' ').length;
    },

    // check if title is large
    hasLargeTitle() {
      const self = this,
        { name } = self.$route,
        wordCount = self.titleWordCount,
        hasLargeTitle = wordCount < 4 && name === 'album';

      return hasLargeTitle;
    },

    // check if stage has cover
    hasCover() {
      const self = this,
        exp = /album|playlist/,
        { name } = self.$route,
        hasCover = exp.test(name) && self.image[0];

      return hasCover;
    },

    // check if stage has any actions
    hasActions() {
      const self = this,
        {
          canFollow, canPlayAll, canSave, canEdit,
        } = self,
        hasActions = canFollow || canPlayAll || canSave || canEdit;

      return hasActions;
    },

    // check if show follow button
    canFollow() {
      const self = this,
        exp = /artist|user|playlist/,
        { params, name } = self.$route,
        isOwner = params.owner === self.currentUser.id || params.id === self.currentUser.id,
        canFollow = params.id && !isOwner && exp.test(name);

      return canFollow;
    },

    // check if show play all button
    canPlayAll() {
      const self = this,
        exp = /playlist|artist|album|mylibraryTracks|mylibraryAlbums|mylibraryHistory/,
        { name } = self.$route,
        canPlayAll = exp.test(name);

      return canPlayAll;
    },

    // check if show save button
    canSave() {
      const self = this,
        exp = /album/,
        { name } = self.$route,
        canSave = exp.test(name);

      return canSave;
    },

    // check if show edit button
    canEdit() {
      const self = this,
        exp = /mylibraryTracks|mylibraryAlbums/,
        {
          name,
        } = self.$route,
        canEdit = exp.test(name);

      return canEdit;
    },

    // get the profile data from array or object
    getProfile() {
      const self = this,
        { profile } = self;

      let profileData;

      if (profile) {
        if (Array.isArray(profile)) [profileData] = profile;
        else profileData = profile;
      }

      return profileData;
    },
  },

  mounted() {
    const self = this;

    self.checkIfFollowing();
    if (self.isLarge) self.initParallax();
  },

  methods: {
    // init the parallax effect on the stage image
    initParallax() {
      const self = this,
        { backgroundInner } = self.$refs,
        parallax = new Rellax(backgroundInner, {
          speed: -5,
          center: false,
          round: true,
          vertical: true,
          horizontal: false,
        });

      return parallax;
    },

    // check if the current user is following this artist / user
    checkIfFollowing() {
      const self = this,
        { isRoute } = self,
        { params } = self.$route,
        userId = self.currentUser.id;

      if (self.canFollow) {
        if (isRoute('artist') || isRoute('user')) {
          const type = isRoute('artist') ? 'artist' : 'user';

          isFollowingArtistOrUser({ type, ids: params.id })
            .then((res) => {
              [self.isFollowing] = res.data;
            });
        } else if (isRoute('playlist')) {
          isFollowingPlaylist({ ownerId: params.owner, playlistId: params.id, ids: userId })
            .then((res) => {
              [self.isFollowing] = res.data;
            });
        }
      }
    },

    // follow or unfollow this artist or user
    setFollowing() {
      const self = this,
        { isRoute } = self,
        { params } = self.$route;

      if (params.id && self.canFollow) {
        const type = isRoute('artist') ? 'artist' : 'user',
          action = self.isFollowing ? 'unfollow' : 'follow';

        if (isRoute('artist') || isRoute('user')) {
          followArtistOrUser({ action, type, ids: params.id })
            .then(() => {
              self.isFollowing = !self.isFollowing;
            });
        } else if (isRoute('playlist')) {
          followPlaylist({ action, ownerId: params.owner, playlistId: params.id })
            .then(() => {
              self.isFollowing = !self.isFollowing;
            });
        }
      }
    },

    // remove 'Cover:' from meta
    formatMeta(value) {
      let meta = value;
      const cover = 'Cover:',
        exp = new RegExp(cover),
        hasCoverMessage = exp.test(meta);

      if (typeof meta === 'string' && hasCoverMessage) [meta] = meta.split(cover);

      return meta;
    },

    // check if route contains routeName
    isRoute(routeName) {
      const self = this,
        exp = new RegExp(routeName),
        { name } = self.$route,
        isRoute = exp.test(name);

      return isRoute;
    },
  },

};
</script>
