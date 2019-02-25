<template lang="pug">
    section.container
        div.player.player-aria.flex.flex-wrap
            player-panel(
                :isPlay="isPlay"
                @on-play="play"
                @on-pause="pause"
                @on-next="next"
                @on-previous="previous"
                @set-progress="progress = $event"
            )
            player-search(@on-search="search")
            player-list(
                :isPlay="isPlay"
                :progress="progress"
                @on-play="play"
                @on-pause="pause"
            )
            
</template>
<script>
import PlayerPanel from './PlayerPanel.vue';
import PlayerSearch from './PlayerSearch.vue';
import PlayerList from './PlayerList.vue';

export default { 
    components:{
        PlayerPanel,
        PlayerSearch,
        PlayerList
    },
    data: function(){
        return {
            isPlay: false,
            volume: 100,
            progress: 0,
        }
    },
    computed:{
        nextTrack(){
            return this.$store.getters.nextTrack;
        },
        previousTrack(){
            return this.$store.getters.previousTrack;
        }
    },
    methods: {
        getTracks(searchString){
            this.$store.dispatch('getTracks', searchString);
        },
        setCurrentTrack(id){
            return this.$store.dispatch('setCurrentTrack', id);
        },
        play(id){
            this.isPlay = false;
            let self = this;
            this.setCurrentTrack(id).then(function(){
                self.isPlay = true;
            });
        },
        pause(){
            this.isPlay = false;
        },
        next(){
            this.play(this.nextTrack.id);
        },
        previous(){
            this.play(this.previousTrack.id);
        },
        search(searchString){
            this.getTracks(searchString);
        }
    },
    created(){
        this.getTracks();
    }
}
</script>
<style lang="scss">
    .player{
        &.player-aria{
            flex-basis: 80%;
            margin: 5% 0;
            background-color: #282e78;
            padding: 3%;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 2px grey;
            color: #272e76;
        }
        .player-box{
            flex-basis: 100%;
        }
        .player-box:not(:last-child){
            margin-bottom: 50px;
        }
    }
</style>


