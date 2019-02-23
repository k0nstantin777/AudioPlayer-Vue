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
        nextTrack: (state) => {
            if(!state.currentTrack 
                || state.currentTrack === state.tracks[state.tracks.length -1]
                || !state.tracks[state.currentTrack.id + 1]
            ){
                return state.tracks[0];
            } else {
                return state.tracks.find(track => track.id === state.currentTrack.id + 1);
            }
        },
        previousTrack: (state) => {
            if(!state.currentTrack 
                || state.currentTrack === state.tracks[0]
                || !state.tracks[state.currentTrack.id - 1]
            ){
                return state.tracks[state.tracks.length - 1];
            } else {
                return state.tracks.find(track => track.id === state.currentTrack.id - 1);
            }
        }
    },
    mutations: {
        setTracks (state, tracks) {
            state.tracks = tracks;
        },
        setCurrentTrack (state, id){
            state.currentTrack = state.tracks.find(track => track.id === id);
        },
    },
    actions: {
        getTracks (context, searchString) {
            let findedTracks = tracks;
            if(searchString){
                findedTracks = findedTracks.filter(track => {
                    if(track.name.indexOf(searchString) > -1 || track.author.indexOf(searchString) > -1){
                        return track;
                    };
                });
            }
            context.commit('setTracks', findedTracks);
        },
        setCurrentTrack (context, id) {
            context.commit('setCurrentTrack', id);
        },
    }
})

export default store;