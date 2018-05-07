<template>
  <div class="c-loader u-sidebarMargin">

    <transition-group
      :css="false"
      class="c-loader__inner"
      tag="div"
      appear="appear"
      @enter="startLoadingAnimation"
    >

      <!-- animated waves -->
      <span
        v-for="(n, index) in 6"
        ref="loaderElement"
        :style="{ left: `${20 * index}px` }"
        :key="index"
        class="c-loader__wave"
      />

    </transition-group>

  </div>
</template>

<script>
import { TweenMax, Power2 } from 'gsap';

export default {

  methods: {
    startLoadingAnimation(el, done) {
      const self = this,
        { loaderElement } = self.$refs;

      TweenMax.staggerTo(loaderElement, 1, {
        height: 60,
        repeat: -1,
        yoyo: true,
        ease: Power2.easeInOut,
        onComplete: done,
      }, 0.1);
    },
  },

};
</script>
