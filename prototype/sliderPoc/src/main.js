// import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';

import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

Vue.component(HistogramSlider.name, HistogramSlider);

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
