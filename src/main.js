import * as firebase from 'firebase';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store';
import DateFilter from './filters/date';
import AlertComponent from './components/Shared/Alert';

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertComponent);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCkyiTt1_7ylufNn0eqFXPdGwb4QVIfdAk',
      authDomain: 'meetups-449f1.firebaseapp.com',
      databaseURL: 'https://meetups-449f1.firebaseio.com',
      projectId: 'meetups-449f1',
      storageBucket: 'meetups-449f1.appspot.com',
    });
  },
});
