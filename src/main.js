import * as firebase from 'firebase';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store';
import DateFilter from './filters/date';
import AlertComponent from './components/Shared/Alert';
import EditMeetupDialog from './components/Meetup/Edit/EditMeetupDialog';
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog';
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog';

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertComponent);
Vue.component('app-edit-meetup-dialog', EditMeetupDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog);


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
      storageBucket: 'gs://meetups-449f1.appspot.com',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
});
