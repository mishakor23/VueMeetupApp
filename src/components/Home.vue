<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="primary">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2 mb-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            v-bind:src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <p>Join meetup</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        { imageUrl: 'https://static.tonkosti.ru/tonkosti/table_img/s20/c4c4/99959938.jpg', id: 'ghsdfuygsd234', title: 'Super Meetup' },
        { imageUrl: 'http://web.kpi.kharkov.ua/kgm/wp-content/uploads/sites/116/2015/11/slide_6.jpg', id: 'ghsdfuywewgsd234', title: 'Super puper Meetup' },
        { imageUrl: 'http://yodsportclub.com/wp-content/uploads/2016/09/%D0%A1%D0%B0%D0%B9%D1%82.jpg', id: 'g56gewgsd234', title: 'The Best Meetup' },
      ],
    };
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    },
  },
};
</script>

<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
