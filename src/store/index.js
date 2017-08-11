/* eslint arrow-body-style: [2, "always"] */
/* eslint no-param-reassign: ["error", { "props": false }]*/

import * as firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://static.tonkosti.ru/tonkosti/table_img/s20/c4c4/99959938.jpg',
        location: 'Kharkiv',
        date: new Date(),
        id: 'ghsdfuygsd234',
        title: 'Super Meetup',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      },
      { imageUrl: 'http://web.kpi.kharkov.ua/kgm/wp-content/uploads/sites/116/2015/11/slide_6.jpg',
        location: 'Kiev',
        date: new Date(),
        id: 'ghsdfuywewgsd234',
        title: 'Super puper Meetup',
        description: 'Temporibus et, itaque deleniti quam tenetur voluptatibus, error, modi ipsa libero nulla nobis dolor.',
      },
      { imageUrl: 'http://yodsportclub.com/wp-content/uploads/2016/09/%D0%A1%D0%B0%D0%B9%D1%82.jpg',
        location: 'Dnepr',
        date: new Date(),
        id: 'g56gewgsd234',
        title: 'The Best Meetup',
        description: 'Facere placeat necessitatibus quisquam eos iusto ut asperiores.',
      },
    ],
    user: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'asdfasdfasdf234',
      };
      commit('createMeetup', meetup);
    },
    signUserUp({ commit }, payload) {
      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          })
          .catch((error) => {
            throw (error);
          });
    },
    signUserIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.id,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        })
        .catch((error) => {
          throw (error);
        });
    },
  },
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
    user(state) {
      return state.user;
    },
  },
});

export default store;
