// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'es6-promise/auto'
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
/* eslint-disable no-new */


import BNavbar from 'bootstrap-vue/es/components/navbar/navbar';
Vue.component('b-navbar', BNavbar);
import BForm from 'bootstrap-vue/es/components/form/form';
Vue.component('b-form', BForm);
import BFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
Vue.component('b-form-group', BFormGroup);
import BFormInput from 'bootstrap-vue/es/components/form-input/form-input';
Vue.component('b-form-input', BFormInput);
import BInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
Vue.component('b-input-group', BInputGroup);
import BAlert from 'bootstrap-vue/es/components/alert/alert';
Vue.component('b-alert', BAlert);
import BProgress from 'bootstrap-vue/es/components/progress/progress';
Vue.component('b-progress', BProgress);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

