import Vue from 'vue'
import Vuex from 'vuex'
import imageAPI from "./api/images";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    pictures: {
      all: [],
      current: {}
    }
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    },
    getAllPictures(state, pictures) {
      state.pictures.all = pictures;
    },
    getOnePicture(state, picture) {
      state.pictures.current = picture;
    }
  },
  actions: {
    startLoading({ commit }) {
      commit('startLoading');
    },
    finishLoading({ commit }) {
      commit('finishLoading');
    },
    getAllPictures({ commit }) {
      commit('startLoading');
      imageAPI.loadImagesData().then(({data}) => {
        commit('getAllPictures', data);
        commit('finishLoading');
      })
    },
    getOnePicture({ commit }, id) {
      commit('startLoading');
      imageAPI.loadImageData(id).then(({data}) => {
        commit('getOnePicture', data);
        commit('finishLoading');
      })
    }
  }
})
