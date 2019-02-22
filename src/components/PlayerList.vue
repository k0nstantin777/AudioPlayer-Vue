<template lang="pug">
    ul.player-box.player-track-list
        li.flex.align-center(
            v-for="track in tracks"
            :class="{active:track.id === currentTrack.id}"
            @click="playTrack(track.id)"    
        ) 
            div.flex.flex-wrap.justify-space-between.basis-100
                span.track-info {{track.name}} - {{track.author}} 
                span.track-duration {{track.duration}}
</template>
<script>
export default {
    data: function(){
        return {
            //tracks: this.$store.state.tracks,
            
        }
    },
    computed: {
        tracks (){
            return this.$store.state.tracks;
        },
        currentTrack(){
            return this.$store.state.currentTrack;
        } 
    },
    methods: {
        playTrack(id){
            this.$store.dispatch('setCurrentTrack', id);
        }
    }
}
</script>
<style lang="scss">
    .player{
        .player-track-list{
            border: 1px solid #fff;
            background: #989494;
            border-radius: 5px;
            font-size: 1.2em;
            color: #272e76;
            li{
                list-style: none;
                height: 30px;
                padding: 5px;
                span{
                    &.track-duration{
                        align-self: flex-end;
                    }
                }
                & > div {
                    cursor:pointer;
                }
                &:not(:last-child){
                    border-bottom: 1px solid #fff;
                }
                &.active > div {
                    padding: 5px;
                    background-color: #215ec5;
                    color: #fff;
                    border-radius: 5px;
                }
            }
        }
    }
</style>


