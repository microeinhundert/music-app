<template lang='pug'>
.o-view__content

  // charts
  ma-section(:title='$t("charts")', :actions='false')

    ma-list(
      slot='list'
      v-for='(item, index) in parentData.charts.tracks.items',
      :key='item.track.id',
      :image='item.track.album.images',
      :title='item.track.name',
      :trackId='item.track.id',
      :artists='item.track.artists',
      :album='item.track.album',
      :explicit='item.track.explicit',
      :popularity='item.track.popularity',
      :duration='item.track.duration_ms',
      :index='index')
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
