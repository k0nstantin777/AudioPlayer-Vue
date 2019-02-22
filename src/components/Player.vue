<template lang="pug">
    section.container
        div.player.player-aria.flex.flex-wrap
            player-panel(:isPlay="isPlay" @play="play" @pause="pause")
            player-search
            player-list(@play="play" @pause="pause")
            
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
        }
    },
    methods: {
        getTracks(){
            this.$store.dispatch('getStorage');
        },
        playTrack(id){
            this.$store.dispatch('setCurrentTrack', id);
        },
        play(){
            this.isPlay = true;
        },
        pause(){
            this.isPlay = false;
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


