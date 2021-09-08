import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


import * as navTo from '@/assets/navTo'
Vue.prototype.$navTo = navTo

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
