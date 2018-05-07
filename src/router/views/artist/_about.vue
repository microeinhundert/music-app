<template lang='pug'>
.o-view__content

  // about this artist
  ma-section(:title='`${$t("about")} ${parentData.artistInfo.name}`')
    p(v-html='parentData.additionalArtistInfo.bio')
</template>

<script>
export default {

  props: {
    parentData: {
      type: Object,
      required: true,
    },
  },

};
</script>
