import { createStore } from 'vuex'



export default createStore({
  state: {
    access: '',
    refresh: '',
    user: null,
    selectedChatId: 0,
    isUserProfileOpen: false,
    openUserProfile: null,
    registrationINFO: null,
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('access')) {
        state.access = localStorage.getItem('access')
      } else {
        state.access = ''
      }
      if (localStorage.getItem('refresh')) {
        state.refresh = localStorage.getItem('refresh')
      } else {
        state.refresh = ''
      }
      if (localStorage.getItem('selectedChatId')) {
        state.selectedChatId = localStorage.getItem('selectedChatId')
      } else {
        state.selectedChatId = 0
      }
    },
    setAccess(state, access) {
      localStorage.setItem("access", access)
      state.access = access
    },
    setRefresh(state, refresh) {
      localStorage.setItem("refresh", refresh)
      state.refresh = refresh
    },
    removeAccess(state) {
      localStorage.removeItem("access")
      state.access = ""
    },
    removeRefresh(state) {
      localStorage.removeItem("refresh")
      state.refresh = ""
    },
    setSelectedChatId(state, chatId) {
      localStorage.setItem("selectedChatId", chatId)
      state.selectedChatId = chatId
    },
    removeSelectedChatId(state) {
      localStorage.removeItem("selectedChatId")
      state.selectedChatId = 0
    },
    setUserInfo(state, userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      state.user = userInfo;
    },
    removeUserInfo(state) {
      localStorage.removeItem("userInfo");
      state.user = null;
    },
    toggleUserProfile(state, profileId = null) {
      if (state.isUserProfileOpen) {
        state.openUserProfile = null;
      } else {
        state.openUserProfile = profileId
      }
      state.isUserProfileOpen = !state.isUserProfileOpen;
    },
    setRegistrationINFO(state, info) {
      localStorage.setItem("registrationINFO", JSON.stringify(info));
      state.registrationINFO = info;
    },
    removeRegistrationINFO(state) {
      localStorage.removeItem("registrationINFO");
      state.registrationINFO = null;
    },
    cleanStorage(state) {
      localStorage.clear();
      state.access = '';
      state.refresh = '';
      state.user = null;
      state.selectedChatId = 0;
    }
  },
  actions: {
  },
  modules: {
  }
})
