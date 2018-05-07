<template>
  <div class="c-sidebarPanel__parent">

    <maPanelList
      :items="listItems"
      @item-click="$emit('close-panel')"
    />

  </div>
</template>

<script>
import maPanelList from '@/components/PanelList';

export default {

  components: {
    maPanelList,
  },

  computed: {
    // get items for list
    listItems() {
      return [{
        name: 'myprofile',
        routeName: 'user',
        meta: 'visitprofile',
      },
      {
        name: 'myaccount',
        meta: 'manageaccount',
      },
      {
        name: 'settings',
        routeName: 'settings',
        meta: 'changesettings',
      },
      {
        name: 'logout',
        routeName: 'logout',
      }];
    },
  },

};
</script>
