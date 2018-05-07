<template>
  <nav class="c-navigation">
    <ul class="c-navigation__list">

      <router-link
        v-for="(navitem, index) in items"
        :key="index"
        :to="{ name: navitem.routeName, params: { id: $route.params.id }}"
        class="c-navigation__item"
        tag="li"
      >

        <!-- item link -->
        <a class="c-navigation__link">{{ navitem.title }}</a>

      </router-link>

      <!-- active indicator -->
      <div
        ref="activeIndicator"
        class="c-navigation__activeIndicator"/>

    </ul>
  </nav>
</template>

<script>
import { TweenMax } from 'gsap';

export default {

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  watch: {
    $route() {
      const self = this;

      self.$nextTick(() => {
        self.updateActiveIndicator(0.5);
      });
    },
  },

  created() {
    const self = this;

    self.$nextTick(() => {
      self.updateActiveIndicator(0);
    });
  },

  methods: {
    // update active element indicator
    updateActiveIndicator(duration) {
      const self = this,
        el = self.$el,
        { activeIndicator } = self.$refs,
        activeItem = el.querySelector('.is-exact-active');

      // tween active indicator
      TweenMax.to(activeIndicator, duration, {
        x() {
          return activeItem ? activeItem.offsetLeft : 0;
        },
        width() {
          return activeItem ? activeItem.offsetWidth : 0;
        },
      });
    },
  },

};
</script>
