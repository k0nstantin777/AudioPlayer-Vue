import Vue from 'vue';
import Vuex from 'vuex';
import tracks from './../tracks';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tracks: {},
        currentTrack: '',
        play: false,
    },
    getters: {
        currentTrack: (state) => {
            //return getters.doneTodos.length;
        }
    },
    mutations: {
        setStorage (state, tracks) {
            state.tracks = tracks;
        },
        setCurrentTrack (state, id){
            state.currentTrack = state.tracks.find(track => track.id === id);
        },
        // togglePlay () {
        //     state.play = !state.play;
        // }
    },
    actions: {
        getStorage (context) {
            context.commit('setStorage', tracks);
        },
        setCurrentTrack (context, id) {
            context.commit('setCurrentTrack', id);
        },
    }
})

export default store;