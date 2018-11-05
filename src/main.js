import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import store from './store';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1)
});

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
