<template>
  <span
    :class="[{ 'c-icon--hover' : hover, }, `c-icon--${type}` ]"
    class="c-icon">

    <i class="material-icons">
      <slot/>
    </i>

  </span>
</template>

<script>
export default {

  props: {
    hover: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'normal',
    },
  },

};
</script>
