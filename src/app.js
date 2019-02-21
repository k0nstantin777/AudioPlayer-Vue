import Vue from 'vue';
import Vuex from 'vuex';
import player from './components/player.vue';
import './assets/styles/style.scss';

Vue.use(Vuex);

const app = new Vue({
    el: '#app',
    render: h => h(player)
});