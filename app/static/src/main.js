import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueDisqus from "vue-disqus";

Vue.config.productionTip = false

Vue.use(VueDisqus);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
