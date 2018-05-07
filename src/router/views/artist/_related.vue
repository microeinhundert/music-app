<template lang='pug'>
.o-view__content

  // related artists
  ma-section(
    :title='$t("relatedto", { name: parentData.artistInfo.name })',
    :subtitle='$t("artistsyoumaylike", { name: parentData.artistInfo.name })',
    :columns='4',
    :actions='false')

    ma-box(
      slot='boxes'
      v-for='artist in parentData.relatedArtists.artists',
      :key='artist.id',
      :type='artist.type',
      :image='artist.images',
      :title='artist.name',
      :primaryid='artist.id')
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
