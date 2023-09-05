import { createStore } from 'vuex'

export default createStore({
  state: {
    access: '',
    refresh: '',
    selectedChatId: 0,
  },
  getters: {
  },
  mutations: {
    initializeStore(state){
      if (localStorage.getItem('access')){
        state.access = localStorage.getItem('access')
      } else {
        state.access = ''
      }
      if (localStorage.getItem('refresh')){
        state.refresh = localStorage.getItem('refresh')
      } else {
        state.refresh = ''
      }
      if (localStorage.getItem('selectedChatId')){
        state.selectedChatId = localStorage.getItem('selectedChatId')
      } else {
        state.selectedChatId = 0
      }
    },
    setAccess(state, access){
      localStorage.setItem("access", access)
      state.access = access
    },
    setRefresh(state, refresh){
      localStorage.setItem("refresh", refresh)
      state.refresh = refresh
    },
    removeAccess(state){
      localStorage.removeItem("access")
      state.access = ""
    },
    removeRefresh(state){
      localStorage.removeItem("refresh")
      state.refresh = ""
    },
    setSelectedChatId(state, chatId){
      localStorage.setItem("selectedChatId", chatId)
      state.selectedChatId = chatId
    },
    removeSelectedChatId(state){
      localStorage.removeItem("selectedChatId")
      state.selectedChatId = 0
    },
  },
  actions: {
  },
  modules: {
  }
})
