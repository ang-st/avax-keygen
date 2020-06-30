import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faCheckCircle);

Vue.component('fa', FontAwesomeIcon);

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
