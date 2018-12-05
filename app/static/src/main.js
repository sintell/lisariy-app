import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueDisqus from "vue-disqus";
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import { sync } from 'vuex-router-sync';
import '@vuikit/theme';

Vue.config.productionTip = false

Vue.use(VueDisqus);
Vue.use(Vuikit);
Vue.use(VuikitIcons);


sync(store, router);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
