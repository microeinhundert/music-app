<template>
  <transition name="fade">
    <div
      v-if="isNotPlaybackDevice"
      class="c-deviceSplash">
      <div class="c-deviceSplash__inner">

        <!-- connect menu -->
        <div class="c-connectMenu">

          <img
            class="c-connectMenu__image"
            src="/static/images/connect_header.png" >

          <!-- current playback device -->
          <div class="c-connectMenu__item is-highlighted">

            <!-- icon -->
            <div class="c-connectMenu__itemIcon">
              <div class="c-connectMenu__iconScreen"/>
              <div class="c-connectMenu__iconKeyboard"/>
            </div>

            <!-- description -->
            <div class="c-connectMenu__itemDescription">
              <p class="c-connectMenu__itemTitle">{{ $t('listeningOn') }}</p>
              <p class="c-connectMenu__itemSubtitle">{{ currentPlayback.device.name }}</p>
            </div>

          </div>


          <!-- this device -->
          <div class="c-connectMenu__item">

            <!-- icon -->
            <div class="c-connectMenu__itemIcon">
              <div class="c-connectMenu__iconScreen"/>
              <div class="c-connectMenu__iconKeyboard"/>
            </div>

            <!-- description -->
            <div class="c-connectMenu__itemDescription">
              <p class="c-connectMenu__itemTitle">{{ deviceName }}</p>
              <p class="c-connectMenu__itemSubtitle">Spotify Connect</p>
            </div>

            <!-- arrow -->
            <ma-icon class="c-connectMenu__itemArrow">arrow_back</ma-icon>

          </div>

        </div>

        <!-- message -->
        <i18n
          class="c-deviceSplash__message"
          path="splash.listeningOnAnotherDevice"
          tag="p">

          <span
            class="c-deviceSplash__deviceName"
            place="deviceName">{{ deviceName }}</span>

        </i18n>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentUser',
      currentPlayback: 'playback/getCurrentPlayback',
      deviceId: 'player/getDeviceId',
    }),

    // check if is current Spotify Connect playback device
    isNotPlaybackDevice() {
      const self = this,
        { currentPlayback, deviceId } = self,
        isNotPlaybackDevice = currentPlayback.device.id !== deviceId;

      return isNotPlaybackDevice;
    },

    // get device name
    deviceName() {
      const self = this,
        { currentUser } = self,
        deviceName = `Music App - ${currentUser.display_name || currentUser.email}`;

      return deviceName;
    },
  },

};
</script>
