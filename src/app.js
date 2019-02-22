import Player from './components/Player.vue';
import store from './../store';
import './assets/styles/style.scss';
import Vue from 'vue';


const app = new Vue({
    el: '#app',
    render: h => h(Player),
    store
});