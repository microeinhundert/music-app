<template>
  <transition
    :css="false"
    appear="appear"
    @enter="panelListEnter">

    <ul class="c-panelList">

      <!-- active indicator -->
      <div
        ref="activeIndicator"
        class="c-panelList__activeIndicator"/>

      <router-link
        v-for="(item, index) in items"
        :key="index"
        :to="getRouteFromData(item)"
        class="c-panelList__item"
        tag="li"
        @click.native="onItemClick"
      >

        <!-- title -->
        <span class="c-panelList__title">{{ $tc(item.name, 0) }}</span>

        <!-- meta -->
        <div class="c-panelList__meta">
          <span>{{ getMetaFromData(item) }}</span>
        </div>

      </router-link>
    </ul>

  </transition>
</template>

<script>
import { TweenMax } from 'gsap';
import { mapGetters } from 'vuex';

export default {

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      settings: 'app/getAppSettings',
      currentUser: 'user/getCurrentUser',
    }),
  },

  watch: {
    $route() {
      const self = this;

      self.$nextTick(() => {
        self.updateActiveIndicator();
      });
    },
  },

  created() {
    const self = this;

    self.$nextTick(() => {
      self.updateActiveIndicator();
    });
  },

  methods: {
    // stagger list items on enter
    panelListEnter(el, done) {
      const self = this,
        listItems = self.$el.querySelectorAll('.c-panelList__item');

      if (listItems) {
        TweenMax.staggerFrom(listItems, 0.5, {
          autoAlpha: 0,
          onComplete: done,
          clearProps: 'all',
        }, 0.05);
      }
    },

    // on list item click
    onItemClick() {
      const self = this,
        { fixedSidebar } = self.settings;

      if (!fixedSidebar) self.$emit('item-click');
    },

    // update active element indicator
    updateActiveIndicator() {
      const self = this,
        el = self.$el,
        { activeIndicator } = self.$refs,
        activeItem = el.querySelector('.is-active');

      // tween active indicator
      TweenMax.to(activeIndicator, 0.5, {
        y() {
          return activeItem ? activeItem.offsetTop : 0;
        },
        height() {
          return activeItem ? activeItem.offsetHeight : 0;
        },
      });
    },

    // get target route for item
    getRouteFromData(item) {
      const self = this;
      let name = item.routeName,
        owner,
        id;

      /* eslint-disable prefer-destructuring */
      if (item.type) {
        name = item.type;
        id = item.id;
        owner = item.owner.id;
      } else if (item.routeName === 'user') {
        id = self.currentUser.id;
      }
      return { name, params: { id, owner } };
    },

    // get meta for item
    getMetaFromData(item) {
      const self = this,
        displayName = self.currentUser.display_name,
        { meta, name, tracks } = item;

      let itemMeta = self.$t(meta);

      if (name === 'logout') itemMeta = self.$t('loggedinas', { name: displayName });
      else if (tracks) itemMeta = `${tracks.total} ${self.$tc('track', tracks.total > 1 ? 0 : 1)}`;

      return itemMeta;
    },
  },

};
</script>
