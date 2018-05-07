<template lang='pug'>
.o-view__parent

  // stage
  ma-stage(:title='$t("settings")')

  .o-view__content
    ma-section(:title='$t("accentcolor")')
      .c-colorPicker
        .c-colorPicker__color(
          v-for='color in settings.accentColors',
          :class='{ "is-active" : settings.currentAccentColor === color.hex }',
          :style='{ backgroundColor : color.hex }',
          @click='accentColor = color.hex',
          v-tooltip='{ content: $t(color.name), offset: 5 }')

    ma-section(title='Data & Content')
      input(type='checkbox', id='additionalArtistInfo', v-model='getAdditionalArtistInfo')
      label(for='additionalArtistInfo') Get additional artist info
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

export default {

  data: () => ({
    getAdditionalArtistInfo: true,
  }),

  computed: {
    ...mapGetters({
      settings: 'app/getAppSettings',
    }),

    accentColor: {
      get() {
        return this.settings.currentAccentColor;
      },
      set(value) {
        this.setAppSettings({ currentAccentColor: value });
      },
    },
  },

  methods: {
    ...mapMutations({
      setAppSettings: 'app/SET_APP_SETTINGS',
    }),
  },

};
</script>
