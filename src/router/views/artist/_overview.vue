<template lang='pug'>
.o-view__content

  // top tracks
  ma-section(
    v-if='parentData.topTracks.tracks',
    :title='$t("toptracks")')

    ma-list(
      slot='list'
      v-for='(track, index) in parentData.topTracks.tracks',
      :key='track.id',
      :trackId='track.id',
      :image='track.album.images',
      :title='track.name',
      :album='track.album',
      :explicit='track.explicit',
      :popularity='track.popularity',
      :duration='track.duration_ms',
      :index='index')

  // albums
  ma-section(
    v-if='parentData.albums.total',
    :title='$tc("album", 0)',
    :actions='false')

    ma-box(
      slot='boxes'
      v-for='album in parentData.albums.items',
      :key='album.id',
      :type='album.type',
      :primaryid='album.id',
      :secondaryid='album.artists[0].id',
      :image='album.images',
      :title='album.name',
      :artists='album.artists')

  // singles
  ma-section(
    v-if='parentData.singles.total',
    :title='$tc("single", 0)')

    ma-box(
      slot='boxes'
      v-for='single in parentData.singles.items',
      :key='single.id',
      :type='single.type',
      :primaryid='single.id',
      :secondaryid='single.artists[0].id',
      :image='single.images',
      :title='single.name',
      :artists='single.artists')

  // appears on
  ma-section(
    v-if='parentData.appearsOn.total',
    :title='$t("appearson")',
    :subtitle='$t("albumswithsongsfrom", { name: parentData.artistInfo.name })')

    ma-box(
      slot='boxes'
      v-for='album in parentData.appearsOn.items',
      :key='album.id',
      :type='album.type',
      :primaryid='album.id',
      :secondaryid='album.artists[0].id',
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
