<template>
  <a
    :class="buttonClasses"
    class="c-button">

    <!-- icon -->
    <ma-icon
      v-if="icon"
      :hover="true"
      type="small">{{ icon }}</ma-icon>

    <!-- title -->
    <span
      v-if="$slots.default"
      class="c-button__title">
      <slot/>
    </span>

  </a>
</template>

<script>
export default {

  props: {
    type: {
      type: String,
      default: 'default',
    },
    icon: {
      type: String,
      default: '',
    },
  },

  computed: {
    // button modifier class
    buttonClasses() {
      const self = this;

      return [`c-button--${self.type}`, { 'has-icon': self.icon }];
    },
  },

};
</script>
