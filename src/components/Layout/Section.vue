<template>
  <section class="c-viewSection">

    <div class="c-viewSection__inner">


      <!-- section header -->
      <div
        v-if="title || actions"
        class="c-viewSection__header">

        <div class="c-viewSection__heading">

          <!-- title -->
          <h1
            v-if="title"
            class="c-viewSection__title">{{ title }}</h1>

          <!-- subtitle -->
          <p
            v-if="subtitle"
            class="c-viewSection__subtitle">{{ subtitle }}</p>

        </div>

        <!-- actions -->
        <div
          v-if="actions"
          class="c-viewSection__actions">

          <!-- carousel controls -->
          <div
            v-if="isCarousel"
            class="c-viewSection__carouselControls">

            <a
              :class="{ 'is-disabled' : isScrolledToStart }"
              class="c-viewSection__carouselControlsIcon c-viewSection__carouselControlsIcon--left"
              @click="scrollToLeft">

              <ma-icon
                :hover="true"
                type="large"
              >keyboard_arrow_left</ma-icon>

            </a>

            <a
              :class="{ 'is-disabled' : isScrolledToEnd }"
              class="c-viewSection__carouselControlsIcon c-viewSection__carouselControlsIcon--right"
              @click="scrollToRight">

              <ma-icon
                :hover="true"
                type="large"
              >keyboard_arrow_right</ma-icon>

            </a>

          </div>

          <!-- collapse toggle -->
          <a
            v-else-if="isCollapsible"
            class="c-viewSection__collapseToggle"
            @click="toggleCollapse">

            <span>{{ $t(isCollapsed ? 'showmore' : 'showless') }}</span>

            <span
              :class="{ 'is-collapsed' : isCollapsed }"
              class="c-viewSection__collapseToggleIcon">

              <ma-icon>keyboard_arrow_up</ma-icon>

            </span>

          </a>

        </div>

      </div>

      <!-- default slot -->
      <ol
        v-if="$slots.default"
        class="c-viewSection__container">
        <slot/>
      </ol>

      <!-- boxes slot -->
      <div
        v-if="$slots.boxes"
        class="c-viewSection__wrapper">

        <transition
          v-if="isCarousel"
          name="slide-right-transform">

          <div
            v-show="isCarousel && !isScrolledToStart"
            class="c-viewSection__overflowGradient c-viewSection__overflowGradient--left"
          />

        </transition>

        <div
          :class="innerSectionClasses"
          class="c-viewSection__container">
          <slot name="boxes"/>
        </div>

        <transition
          v-if="isCarousel"
          name="slide-left-transform">

          <div
            v-show="isCarousel && !isScrolledToEnd"
            class="c-viewSection__overflowGradient c-viewSection__overflowGradient--right"
          />

        </transition>

      </div>

      <!-- list slot -->
      <ol
        v-if="$slots.list"
        class="c-viewSection__container c-viewSection__container--list">

        <slot name="list"/>

      </ol>

      <span
        v-if="copyright"
        class="c-viewSection__copyright">{{ copyright }}</span>

    </div>

  </section>
</template>

<script>
import { TweenLite } from 'gsap';

export default {

  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    actions: {
      type: Boolean,
      default: true,
    },
    copyright: {
      type: String,
      default: '',
    },
    columns: {
      type: Number,
      default: 5,
    },
    visibleElementCount: {
      type: Number,
      default: 3,
    },
  },

  data: () => ({
    isCollapsed: true,
    carouselPosition: 0,
    currentItem: 0,
    gridGap: 20,
  }),

  computed: {
    // inner section container class
    innerSectionClasses() {
      const self = this,
        { isCarousel, columns } = self,
        be = 'c-viewSection__container';

      return [
        !isCarousel ? `${be}--${columns}Columns` : '',
        `${be}--${isCarousel ? 'carousel' : 'grid'}`,
      ];
    },

    // get the child elements
    childElements() {
      const self = this,
        slots = self.$slots,
        childElements = Object.values(slots)[0];

      return childElements;
    },

    // count the child elements
    childElementCount() {
      const self = this,
        { childElements } = self,
        childElementCount = childElements.length;

      return childElementCount;
    },

    // get the child elements type
    childElementType() {
      const self = this,
        { childElements } = self,
        [el] = childElements,
        n = el.tag.lastIndexOf('-'),
        childElementName = el.tag.substring(n + 1);

      return childElementName;
    },

    // check if section is collapsible
    isCollapsible() {
      const self = this,
        {
          childElementCount, childElementType, visibleElementCount, actions,
        } = self,
        isType = childElementType === 'list',
        isCount = childElementCount > visibleElementCount,
        isCollapsible = (isType && isCount) && actions;

      return isCollapsible;
    },

    // check if section is a carousel
    isCarousel() {
      const self = this,
        {
          childElementCount, childElementType, actions,
        } = self,
        isType = childElementType === 'box',
        isCount = childElementCount > 5,
        isCarousel = (isType && isCount) && actions;

      return isCarousel;
    },

    // get the inner section's width
    stepWidth() {
      const self = this,
        { childElements, gridGap } = self,
        box = childElements[0].elm,
        stepWidth = box.offsetWidth + gridGap;

      return stepWidth;
    },

    // check if the carousel is scrolled to the start
    isScrolledToStart() {
      const self = this,
        { isCarousel, currentItem } = self,
        isScrolledToStart = isCarousel && (currentItem === 0);

      return isScrolledToStart;
    },

    // check if the carousel is scrolled to the end
    isScrolledToEnd() {
      const self = this,
        {
          isCarousel, currentItem, childElementCount, columns,
        } = self,
        isLastItem = currentItem === (childElementCount - columns),
        isScrolledToEnd = isCarousel && isLastItem;

      return isScrolledToEnd;
    },

    // get inner section width
    // innerSectionWidth() {
    //   const self = this,
    //     el = self.$el,
    //     innerSection = el.querySelector('.c-viewSection__container'),
    //     innerSectionWidth = innerSection.offsetWidth;
    //   return innerSectionWidth;
    // },

    // get the number of visible items
    // visibleItemCount() {
    //   const self = this,
    //     { innerSectionWidth, stepWidth, isCarousel } = self,
    //     visibleItemCount = Math.round(innerSectionWidth / stepWidth);
    //   return isCarousel ? visibleItemCount : null;
    // },
  },

  watch: {
    isCollapsed() {
      const self = this;

      if (self.isCollapsible) self.toggleVisibleElements();
    },
    currentItem() {
      this.scrollInnerSection();
    },
  },

  mounted() {
    const self = this;

    if (self.isCollapsible) self.toggleVisibleElements();
  },

  methods: {
    // toggle collapse
    toggleCollapse() {
      const self = this;

      self.isCollapsed = !self.isCollapsed;
    },

    // toggle the count of visible box or list elements
    toggleVisibleElements() {
      const self = this,
        { childElements, visibleElementCount, isCollapsed } = self,
        elementsToHide = childElements.filter((item, index) => index > (visibleElementCount - 1));

      elementsToHide.forEach(({ elm: el }) => {
        TweenLite.set(el, isCollapsed ? { display: 'none' } : { clearProps: 'display' });
      });
    },

    // scroll the carousel to the left
    scrollToLeft() {
      const self = this;

      if (!self.isScrolledToStart) self.currentItem -= 1;
    },

    // scroll the carousel to the right
    scrollToRight() {
      const self = this;

      if (!self.isScrolledToEnd) self.currentItem += 1;
    },

    // scroll the inner section container
    scrollInnerSection() {
      const self = this,
        { stepWidth, currentItem } = self,
        el = self.$el,
        innerSection = el.querySelector('.c-viewSection__container');

      if (innerSection) {
        TweenLite.to(innerSection, 0.3, {
          x: -(stepWidth * currentItem),
        });
      }
    },
  },

};
</script>
