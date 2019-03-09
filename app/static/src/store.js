import Vue from 'vue'
import Vuex from 'vuex'
import imageAPI from "./api/images";
import authAPI from "./api/auth";
import categoriesAPI from './api/categories';
import {
  GET_ALL_PICTURES,
  GET_ONE_PICTURE,
  SUBMIT_PICTURES,
  FINISH_SUBMITING_PICTURES,
  ADD_PICTURES_TO_SUBMIT,
  REMOVE_PICTURE_FROM_SUBMIT,
  SHOW_PICTURE,
  HIDE_PICTURE,
  BEGIN_PICTURE_DELETE,
  PICTURE_DELETE,
  ROLLBACK_PICTURE_DELETE,
  BEGIN_PICTURE_UPDATE,
  PICTURE_UPDATE,
  ROLLBACK_PICTURE_UPDATE,
  UPDATE_PICTURE_TAGS,
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATIONS,
  LOG_IN,
  LOG_OUT,
  REGISTER,
  GET_ALL_CATEGORIES,
  BEGIN_CATEGORY_DELETE,
  CATEGORY_DELETE,
  ROLLBACK_CATEGORY_DELETE,
  BEGIN_CATEGORY_UPDATE,
  CATEGORY_UPDATE,
  ROLLBACK_CATEGORY_UPDATE,
  GET_CATEGORY_SUGGEST,
} from "./types";

Vue.use(Vuex)

const newToOld = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
}

const markToUpdate = (id, toUpdate) => {
  return (p) => p.id === id ? {...p, toUpdate}: p
}
const markToDelete = (id, toDelete) => {
  return (p) => p.id === id ? {...p, toDelete}: p
}
const markHidden = (id, isHidden) => {
  return (p) => p.id === id ? {...p, isHidden}: p
}

export default new Vuex.Store({
  state: {
    loading: false,
    pictures: {
      all: [],
      current: {}
    },
    categories: {
      all: [],
      suggests: [],
      suggestDebounce: null,
    },
    submitedPictures: {
      status: 0,
      loading: false,
      all: [],
      editable: []
    },
    user: {},
    notifications: []
  },
  getters:{
    picturesNewToOld: state => {
      return state.pictures.all.sort(newToOld);
    },
    categoriesNewToOld: state => {
      return state.categories.all.sort(newToOld);
    },
    isLoggedIn: state => {
      return state.user && !!state.user.login;
    }
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    },
    [GET_ALL_PICTURES]:(state, pictures) => {
      state.pictures.all = pictures;
    },
    [GET_ONE_PICTURE]:(state, picture) => {
      state.pictures.current = picture;
    },
    [SUBMIT_PICTURES]:(state) => {
      state.submitedPictures.loading = true;
    },
    [FINISH_SUBMITING_PICTURES]:(state, submitedPictures) => {
      state.submitedPictures.loading = false;
      if (submitedPictures) {
        state.submitedPictures.all = [];
        state.submitedPictures.editable = Object.values(submitedPictures);
      }
    },
    [ADD_PICTURES_TO_SUBMIT]:(state, pictures) => {
      for (let i = 0; i < pictures.length; i++) {
        state.submitedPictures.all.push(pictures.item(i));
      }
    },
    [REMOVE_PICTURE_FROM_SUBMIT]:(state, key) => {
      state.submitedPictures.all.splice(key, 1);
    },
    [LOG_IN]: (state, user) => {
      state.user = user;
    },
    [LOG_OUT]: (state) => {
      state.user = {};
    },
    [REGISTER]: (state, user) => {
      state.user = user;
    },
    [ADD_NOTIFICATION]: (state, notification) => {
      state.notifications.push(notification);
    },
    [UPDATE_NOTIFICATIONS]: (state, notifications) => {
      state.notifications = notifications;
    },
    [SHOW_PICTURE]:(state, id) => {
      state.pictures.all = state.pictures.all.map(markHidden(id, false));
    },
    [HIDE_PICTURE]:(state, id) => {
      state.pictures.all = state.pictures.all.map(markHidden(id, true));
    },
    [BEGIN_PICTURE_DELETE]:(state, id) => {
      state.pictures.all = state.pictures.all.map(markToDelete(id, true));
    },
    [PICTURE_DELETE]:(state, id) => {
      state.pictures.all = state.pictures.all.filter((p) => p.id !== id);
    },
    [ROLLBACK_PICTURE_DELETE]:(state, id)=> {
      state.pictures.all = state.pictures.all.map(markToDelete(id, false));
    },
    [BEGIN_PICTURE_UPDATE]:(state, id) => {
      state.submitedPictures.editable = state.submitedPictures.editable.map(markToUpdate(id, true));
    },
    [PICTURE_UPDATE]:(state, picture) => {
      state.pictures.all = state.pictures.all.map((p) => p.id == picture.id ? picture : p);
      state.submitedPictures.editable = state.submitedPictures.editable.filter(p => p.id !== picture.id);
    },
    [ROLLBACK_PICTURE_UPDATE]:(state, id) => {
      state.pictures.all = state.submitedPictures.editable.map(markToUpdate(id, false));
    },
    [UPDATE_PICTURE_TAGS]:(state, {pictureId, tags}) => {
      state.pictures.all = state.pictures.all
        .map((p) => p.id === pictureId ? {...p, tags: tags}: p);
    },
    [GET_ALL_CATEGORIES]: (state, categories) => {
      state.categories.all = categories;
    },
    [GET_CATEGORY_SUGGEST]: (state, {suggests, suggestDebounce}) => {
      state.categories.suggestDebounce = suggestDebounce;
      state.categories.suggests = suggests.map(s => ({text: s.text}));
    },
    [BEGIN_CATEGORY_DELETE]: (state, id) => {
      state.categories.all = state.categories.all.map(markToDelete(id, true))
    },
    [CATEGORY_DELETE]: (state, id) => {
      state.categories.all = state.categories.all.filter((c) => c.id == id);
    },
    [ROLLBACK_CATEGORY_DELETE]: (state, id) => {
      state.categories.all = state.categories.all.map(markToDelete(id, false))
    },
    [BEGIN_CATEGORY_UPDATE]: (state, id) => {
      state.categories.all = state.categories.all.map(markToUpdate(id, true));
    },
    [CATEGORY_UPDATE]: (state, category) => {
      state.categories.all = state.categories.all.map((c) => c.id == category.id ? category : c);
    },
    [ROLLBACK_CATEGORY_UPDATE]: (state, id) => {
      state.categories.all = state.categories.all.map(markToUpdate(id, false));
    },
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
      imageAPI.loadImagesData().then(({data: {response}}) => {
        commit(GET_ALL_PICTURES, response);
        commit('finishLoading');
      }).catch(() => {
        commit(ADD_NOTIFICATION, {message: "Ошибка при загрузке изображений", status: "danger"})
      })
    },
    getOnePicture({ commit }, id) {
      commit('startLoading');
      imageAPI.loadImageData(id).then(({data: {response}}) => {
        commit(GET_ONE_PICTURE, response);
        commit('finishLoading');
      }).catch(() => {
        commit(ADD_NOTIFICATION, {message: "Ошибка при загрузке изображений", status: "danger"})
      })
    },
    showPicture({ commit }, id) {
      imageAPI.showImage(id).then(() => {
        commit(SHOW_PICTURE, id);
      })
    },
    hidePicture({ commit }, id) {
      imageAPI.hideImage(id).then(() => {
        commit(HIDE_PICTURE, id);
      })
    },
    deletePicture({ commit }, id) {
      commit(BEGIN_PICTURE_DELETE, id);
      imageAPI.deleteImage(id).then(() => {
        commit(PICTURE_DELETE, id);
      }).catch(() => {
        commit(ROLLBACK_PICTURE_DELETE, id);
        commit(ADD_NOTIFICATION, {message: 'Ошибка удаления', status: 'danger'});
      })
    },
    submitPictures({ commit, state }) {
      commit(SUBMIT_PICTURES);
      imageAPI.saveImages(state.submitedPictures.all).then(({data: {response}}) => {
        commit(FINISH_SUBMITING_PICTURES, response);
        commit(ADD_NOTIFICATION, {message: "Изображения успешно загружены", status: "success", timeout: 3000})
      }).catch(() => {
        commit(FINISH_SUBMITING_PICTURES, false);
        commit(ADD_NOTIFICATION, {message: "Ошибка при загрузке изображений", status: "danger"})
      })
    },
    addPicturesToSubmit({ commit }, files) {
      commit(ADD_PICTURES_TO_SUBMIT, files);
    },
    removePictureFromSubmit({ commit }, id) {
      commit(REMOVE_PICTURE_FROM_SUBMIT, id);
    },
    updatePicture({ commit }, picture) {
      commit(BEGIN_PICTURE_UPDATE, picture.id);
      imageAPI.updateImage(picture).then(() => {
        commit(PICTURE_UPDATE, picture);
      }).catch(() => {
        commit(ROLLBACK_PICTURE_UPDATE, picture.id);
      });
    },
    [UPDATE_PICTURE_TAGS]: ({ commit }, {pictureId, tags}) => {
      commit(UPDATE_PICTURE_TAGS, {pictureId, tags});
    },
    login({ commit }, authData) {
      return authAPI.login(authData).then(({data: {response}}) => {
        commit(LOG_IN, response);
      })
    },
    logout({ commit }) {
      return authAPI.logout().then(({data: {response}}) => {
        commit(LOG_OUT, response);
      });

    },
    [REGISTER]: ({ commit }, authData) => {
      return authAPI.register(authData).then(({data: {response}}) => {
        commit(REGISTER, response);
      });
    },
    getMeInfo({ commit }) {
      authAPI.getMe().then(({data: {response}}) => {
        if (response.key) {
          commit(LOG_IN, response);
        }
      }).catch(() => {
      });
    },
    addNotification({ commit }, notification) {
      commit(ADD_NOTIFICATION, notification);
    },
    updateNotifications({ commit }, notifications) {
      commit(UPDATE_NOTIFICATIONS, notifications);
    },
    [GET_ALL_CATEGORIES]: ({ commit }) => {
      categoriesAPI.loadCategoriesData().then(({data: {response}}) => {
        commit(GET_ALL_CATEGORIES, response);
      }).catch(() => {
        commit(ADD_NOTIFICATION, {message: "Ошибка при загрузке категорий", status: "danger"})
      })
    },
    [GET_CATEGORY_SUGGEST]: ({ commit, state }, text) => {
      clearTimeout(state.categories.suggestDebounce);
      const suggestDebounce = setTimeout(() => {
        categoriesAPI.loadCategoriesSuggest(text).then(({data: {response}}) => {
          commit(GET_CATEGORY_SUGGEST, {suggests: response, suggestDebounce});
        }).catch(() => {});
      }, 100);
    },
    [CATEGORY_DELETE]: ({ commit }, category) => {
      commit(BEGIN_CATEGORY_DELETE, category.id);
      categoriesAPI.deleteCategory(category.id).then(() => {
        commit(CATEGORY_DELETE, category.id);
      }).catch(() => {
        commit(ROLLBACK_CATEGORY_DELETE, category.id);
      })
    },
    [CATEGORY_UPDATE]: ({ commit }, category) => {
      commit(BEGIN_CATEGORY_UPDATE, category.id);
      categoriesAPI.updateCategory(category.id, category).then(({data: {response}}) => {
        commit(CATEGORY_UPDATE, response);
      }).catch(() => {
        commit(ROLLBACK_CATEGORY_UPDATE, category.id);
      })
    },
  }
})
