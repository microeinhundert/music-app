<template lang='pug'>
.o-view__content

  // new releases
  ma-section(:title='$t("newreleases")', :actions='false')

    ma-box(
      slot='boxes'
      v-for='album in parentData.releases.albums.items',
      :key='album.id',
      :type='album.type',
      :primaryid='album.id',
      :image='album.images',
      :title='album.name',
      :artists='album.artists')
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
