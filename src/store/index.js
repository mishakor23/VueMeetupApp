/* eslint arrow-body-style: [2, "always"] */
/* eslint no-param-reassign: ["error", { "props": false }]*/
/* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */


import * as firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedMeetups: null,
    // [
    //   { imageUrl: 'https://static.tonkosti.ru/tonkosti/table_img/s20/c4c4/99959938.jpg',
    //     location: 'Kharkiv',
    //     date: new Date(),
    //     id: 'ghsdfuygsd234',
    //     title: 'Super Meetup',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    //   },
    //   { imageUrl: 'http://web.kpi.kharkov.ua/kgm/wp-content/uploads/sites/116/2015/11/slide_6.jpg',
    //     location: 'Kiev',
    //     date: new Date(),
    //     id: 'ghsdfuywewgsd234',
    //     title: 'Super puper Meetup',
    //     description: 'Temporibus et, itaque deleniti quam tenetur voluptatibus,
    //     error, modi ipsa libero nulla nobis dolor.',
    //   },
    //   { imageUrl: 'http://yodsportclub.com/wp-content/uploads/2016/09/%D0%A1%D0%B0%D0%B9%D1%82.jpg',
    //     location: 'Dnepr',
    //     date: new Date(),
    //     id: 'g56gewgsd234',
    //     title: 'The Best Meetup',
    //     description: 'Facere placeat necessitatibus quisquam eos iusto ut asperiores.',
    //   },
    // ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              meetups.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date,
                location: obj[key].location,
                creatorId: obj[key].creatorId,
              });
            }
            commit('setLoadedMeetups', meetups);
            commit('setLoading', false);
          }
        })
        .catch((error) => {
          commit('setLoading', false);
          throw (error);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      };
      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })
        .then((meetupKey) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref(`meetups/${meetupKey}${ext}`).put(payload.image);
        })
        .then((fileData) => {
          imageUrl = fileData.metadata.downloadURLs[0];
          return firebase.database().ref('meetups').child(key).update({ imageUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl,
            id: key,
          });
        })
        .catch((error) => {
          throw (error);
        });
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          })
          .catch((error) => {
            commit('setLoading', false);
            commit('setError', error);
          });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const newUser = {
            id: user.id,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          throw (error);
        });
    },
    clearError({ commit }) {
      commit('clearError');
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
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
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
});

export default store;
