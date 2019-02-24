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
                    span.track-duration {{track.id === currentTrack.id ? currentTrackDuration : track.duration}}
</template>
<script>
import Timer from './../assets/js/Timer.js'
export default {
    props: ['isPlay'],
    data: function(){
        return {
            currentTrackDuration: 0,
            timer: null, 
            timeout: undefined,   
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
    watch: {
        currentTrack(track){
            this.changeTrack(track.id)
        },
        isPlay(value){
            if(value) this.timerTick();   
        }
    },
    methods: {
        toggleTrack(id){
            if(this.isPlay && id === this.currentTrack.id){
                this.pause();  
            } else if (!this.isPlay && id === this.currentTrack.id) {
                this.play(id);
            } else {
                this.changeTrack(id);
            }
        },
        play(id){
            this.$emit('on-play', id);  
        },
        pause(){
            this.$emit('on-pause');  
        },
        changeTrack(id){
            const self = this;
            this.timer = null;
            this.$store.dispatch('setCurrentTrack', id).then(function(){                   
                self.timerInit();
                self.$emit('on-play', id);
            });    
        },
        timerInit(){
            this.currentTrackDuration = this.currentTrack.duration;
            if(this.timeout !== undefined){
                clearTimeout(this.timeout);    
            }
            this.timer = new Timer(this.currentTrackDuration);
        },
        timerTick(){
            let self = this;
            this.timeout = setTimeout(function(){
                if(self.isPlay){
                    self.currentTrackDuration = self.timer.tick();  
                    self.timerTick();  
                }
            },1000) 
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
                min-height: 30px;
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


