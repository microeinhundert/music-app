const mutations = {
  /**
  * Add or remove a notice.
  * @param { object } payload The function payload.
  * @param { string } [ payload.type = 'error', 'warning' ] The type of the notice.
  * @param { string } payload.message The message to show in the notice.
  * @param { string } [ payload.action = 'add', 'remove' ] Add or remove a notice.
  */
  SET_NOTICE(state, { type, message, action }) {
    const self = state;

    switch (action) {
      case 'remove':
        self.notices.shift();
        break;
      case 'add':
      default:
        if (self.notices <= 3) self.notices.unshift({ type, message });
    }
  },

  /**
  * Show or hide a modal.
  * @param { object } payload The function payload.
  * @param { string } [ payload.modal = 'video' ] The state to push the data to.
  * @param { string } payload.value The new value to save to the targeted state.
  */
  SET_MODAL(state, payload) {
    const self = state;

    if (payload) {
      Object.keys(payload).forEach((key) => {
        self.modals[key] = payload[key];
      });
    }
  },

  /**
  * Push app settings to state.
  * @param { object } payload The function payload.
  * @param { string } [ payload.setting = 'currentAccentColor', 'largeCover', 'fixedSidebar' ] The state to push the data to.
  * @param { string } payload.value The new value to save to the targeted state.
  */
  SET_APP_SETTINGS(state, payload) {
    const self = state;

    if (payload) {
      Object.keys(payload).forEach((key) => {
        self.settings[key] = payload[key];
      });
    }
  },
};

export default mutations;
