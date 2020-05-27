import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';
import FocusPoint from 'vue-focuspoint-component';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

Vue.component(HistogramSlider.name, HistogramSlider);
Vue.component('focus-point', FocusPoint);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
