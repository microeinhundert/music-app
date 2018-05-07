<template>
  <header
    :class="{ 'is-scrolled' : scrollPosition > 0 }"
    class="c-header u-sidebarMargin">
    <div class="c-header__container">

      <!-- navigation -->
      <div class="c-header__inner c-header__inner--left">

        <div class="c-header__navigation">

          <!-- left arrow -->
          <a
            class="c-header__navigationIcon c-header__navigationIcon--back"
            @click="$router.back()">

            <ma-icon
              :hover="true"
              type="large"
            >keyboard_arrow_left</ma-icon>

          </a>

          <!-- right arrow -->
          <a
            class="c-header__navigationIcon c-header__navigationIcon--forward"
            @click="$router.forward()">

            <ma-icon
              :hover="true"
              type="large"
            >keyboard_arrow_right</ma-icon>

          </a>

        </div>

      </div>

      <!-- search -->
      <div class="c-header__inner c-header__inner--middle">
        <div class="c-header__search">

          <!-- search icon -->
          <div class="c-header__searchIcon">
            <ma-icon>search</ma-icon>
          </div>

          <!-- search field -->
          <input
            v-model="searchQuery"
            :placeholder="searchHint || $tc('search', 0)"
            class="c-header__searchField"
            type="text"
            @focus="searchHint = $tc('searchhint', 0)"
            @blur="searchHint = null"
            @keyup.enter="doSearch"
          >

        </div>
      </div>

      <div class="c-header__inner c-header__inner--right">

        <!-- github button -->
        <ma-button
          href="https://github.com/microeinhundert/music-app"
          target="_blank"
        >
          Visit on GitHub
        </ma-button>

      </div>

    </div>
  </header>
</template>

<script>
export default {

  data: () => ({
    searchQuery: '',
    searchHint: null,
    scrollPosition: null,
  }),

  mounted() {
    // add event listeners
    window.addEventListener('scroll', () => {
      this.updateScroll();
    });
  },

  methods: {
    // update scroll position
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },

    // do the search
    doSearch() {
      const self = this,
        { searchQuery } = self;

      if (searchQuery) {
        self.$router.push({
          name: 'search',
          params: {
            searchQuery,
          },
          query: {
            type: 'album,artist,track',
          },
        });
      } else {
        self.$router.push({
          name: 'browse',
        });
      }
    },
  },

  destroy() {
    // remove event listeners
    window.removeEventListener('scroll');
  },

};
</script>
