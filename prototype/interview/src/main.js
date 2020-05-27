// import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
