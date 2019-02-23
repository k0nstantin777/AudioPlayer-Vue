<template lang="pug">
    div.player-box
        p.no-tracks(v-if="!tracks.length") Ничего не найдено попытайтесь изменить строку поиска
        ul.player-track-list(v-else)
            li.flex.align-center(
                v-for="track in tracks"
                :class="{active:track.id === currentTrack.id}"
                @click="toggleTrack(track.id)"    
            ) 
                div.flex.flex-wrap.justify-space-between.basis-100
                    span.track-info {{track.name}} - {{track.author}} 
                    span.track-duration {{track.duration}}
</template>
<script>
export default {
    props: ['isPlay'],
    data: function(){
        return {
                
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
        toggleTrack(id){
            if(this.isPlay && id === this.currentTrack.id){
                this.$emit('on-pause');    
            } else {
                let self = this;
                this.$store.dispatch('setCurrentTrack', id).then(function(){
                    self.$emit('on-play', id);
                });
            }
            
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
        .no-tracks{
            color:#fff;
        }
    }
</style>


