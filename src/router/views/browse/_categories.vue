<template lang='pug'>
.o-view__content

  // categories
  ma-section(:title='$tc("category", 0)', :actions='false')

    ma-box(
      slot='boxes'
      v-for='category in parentData.categories.categories.items',
      :key='category.id',
      type='category',
      :primaryid='category.id',
      :image='category.icons',
      :title='category.name')
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
