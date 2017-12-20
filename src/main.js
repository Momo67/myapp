// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueGoodTable from 'vue-good-table'
import Datatable from 'vue2-datatable-component'
import Vuetable from 'vuetable-2'
import 'semantic-ui/dist/semantic.css'
import 'semantic-ui/dist/semantic.js'
import ArbreStore from './store/ArbreStore'

Vue.use(VueGoodTable)
Vue.use(Datatable)
Vue.use(Vuetable)
Vue.use(ArbreStore)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
