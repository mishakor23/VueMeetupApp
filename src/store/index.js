/* eslint arrow-body-style: [2, "always"] */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://static.tonkosti.ru/tonkosti/table_img/s20/c4c4/99959938.jpg', date: '2017-07-17', id: 'ghsdfuygsd234', title: 'Super Meetup' },
      { imageUrl: 'http://web.kpi.kharkov.ua/kgm/wp-content/uploads/sites/116/2015/11/slide_6.jpg', date: '2017-07-19', id: 'ghsdfuywewgsd234', title: 'Super puper Meetup' },
      { imageUrl: 'http://yodsportclub.com/wp-content/uploads/2016/09/%D0%A1%D0%B0%D0%B9%D1%82.jpg', date: '2017-07-21', id: 'g56gewgsd234', title: 'The Best Meetup' },
    ],
    user: {
      id: 'dsfgsdfgs23423',
      registeredMeetups: ['ghsdfuygsd234'],
    },
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
});

export default store;
