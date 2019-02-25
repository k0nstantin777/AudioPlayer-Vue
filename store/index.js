import Vue from 'vue';
import Vuex from 'vuex';
import tracks from './../tracks';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tracks: {},
        currentTrack: '',
    },
    getters: {
        nextTrack: (state) => {
            if(!state.currentTrack || state.currentTrack === state.tracks[state.tracks.length -1]){
                return state.tracks[0];
            } 
            let track = state.tracks.find(track => track.id === state.currentTrack.id + 1);
            if (!track){
                track = state.tracks[0];
            }
            return track;
            
        },
        previousTrack: (state) => {
            if(!state.currentTrack || state.currentTrack === state.tracks[0]){
                return state.tracks[state.tracks.length - 1];
            } 
            let track = state.tracks.find(track => track.id === state.currentTrack.id - 1);
            if (!track){
                track = state.tracks[state.tracks.length - 1];
            }
            return track;
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