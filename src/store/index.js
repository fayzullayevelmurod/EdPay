import { createStore } from 'vuex'

export default createStore({
  state: {
    datas: {},
    current_step: 1,
    landing_show: false,
    header_mobile: false,
  },
  getters: {
  },
  mutations: {
    saveData (state, datas) {
      state.datas = datas;
    },
    changeCurrentStep (state, step) {
      state.current_step = step;
    },
    changeLandingShow (state, value) {
      state.landing_show = value;
    },
    changeHeaderMobile (state, value) {
      state.header_mobile = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
