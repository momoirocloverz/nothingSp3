import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from 'element-ui';
import './element-variables.scss'
import api from './api/api';
import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false;
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.prototype.bucketHost = 'img.10000rc.com'

if (process.env.NODE_ENV == 'production') {
  if (process.env.VUE_APP_TITLE == 'pre') {
      Vue.prototype.$uploadBG = 'http://pre.api.10000rc.com/pre/biz/talent/platform/uploadingBackgroundSurvey';
      Vue.prototype.$importInsuEmp = 'http://pre.api.10000rc.com/biz/insu/importInsuEmp';
  } else if (process.env.VUE_APP_TITLE == 'test') {
      Vue.prototype.$uploadBG = 'http://test.api.10000rc.com/biz/talent/platform/uploadingBackgroundSurvey';
      Vue.prototype.$importInsuEmp = 'http://test.api.10000rc.com/biz/insu/importInsuEmp';
  } else {
      Vue.prototype.$uploadBG = 'http://www.10000rc.com/2.0/biz/talent/platform/uploadingBackgroundSurvey';
      Vue.prototype.$importInsuEmp = 'http://www.10000rc.com/2.0/biz/insu/importInsuEmp';
  }
} else {
    Vue.prototype.$uploadBG = 'http://test.api.10000rc.com/biz/talent/platform/uploadingBackgroundSurvey';
    Vue.prototype.$importInsuEmp = 'http://test.api.10000rc.com/biz/insu/importInsuEmp';
}

new Vue({
  api,
  router,
  store,
  render: h => h(App)
}).$mount("#app");