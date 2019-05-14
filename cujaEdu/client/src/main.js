// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuex from 'vuex'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGoogleApi from 'vue-google-api'

Vue.config.productionTip = false

var config = {
    apiKey: "AIzaSyC1A6KItrAPrSWj4WYTukgV913gVLoKIlg",
    authDomain: "cuja-d9e71.firebaseapp.com",
    databaseURL: "https://cuja-d9e71.firebaseio.com",
    projectId: "cuja-d9e71",
    storageBucket: "cuja-d9e71.appspot.com",
    discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    scopes: "https://www.googleapis.com/auth/drive.readonly",
    clientId: "741338770706-gntvcgqgagkm9r6op9gi8g0old89ftbo.apps.googleusercontent.com",
    messagingSenderId: "741338770706"
  };

firebase.initializeApp(config);

Vue.use(BootstrapVue)

import "./assets/global.css"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
