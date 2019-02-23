<template lang="pug">
    div.player-box.player-main-panel.flex.justify-space-between
        div.player-controls
            span.icon.fa.fa-step-backward(@click="$emit('on-previous')")
            span.icon.fa(:class="{'fa-play':!isPlay, 'fa-pause':isPlay}" @click="tooglePlay()")
            span.icon.fa.fa-step-forward(@click="$emit('on-next')")
        div.player-track.flex.align-center
            progress#progressbar(value="50" max="100")
            audio#track(:src="currentTrack ? currentTrack.link : null") 
        div.player-volume.flex.align-center
            input(
                min="0" max="1" step="0.05"
                type="range"
                @change="setVolume($event.target.value)"
                v-bind:value="volume"
            ) 
</template>
<script>
export default {
    props: ['isPlay'],
    data: function(){
        return {
            audioElement: null,
            volume: 1,
        }
    },
    computed: {
        currentTrack (){
            return this.$store.state.currentTrack;
        } 
    },
    methods: {
        tooglePlay(){
            if(this.isPlay){
                this.$emit('on-pause')
            } else {
                this.$emit('on-play', this.currentTrack ? this.currentTrack.id : 1);        
            } 
        },
        setVolume(value){
            this.volume = value;
            this.audioElement.volume = value;    
        }
    },
    watch: {
        isPlay (newValue, OldValue){
            if(!this.currentTrack){
                return;
            }
            if(newValue){
                this.audioElement.play();
            } else {
                this.audioElement.pause();    
            }
        },
    },
    mounted() {
        this.audioElement = document.querySelector('audio#track');
    }
}
</script>
<style lang="scss">
    .player{
        .player-main-panel{
            .player-controls{
                flex-grow:1;
                .icon{
                    color: #fff;
                    font-size: 3em;
                    text-shadow: 0px 2px 20px grey;
                    margin: 0 10px;
                    cursor: pointer;
                    &:active{
                        text-shadow: none;
                    }
                    &.fa-play, &.fa-pause{
                        max-width: 33px;
                    }
                }
            }
            .player-track{
                flex-grow:10;
                margin: 0 3%;
                progress {
                    border:0;
                    width: 100%;
                    height: 20px;
                    border-radius: 5px;
                    background: #f1f1f1;
                    -webkit-box-shadow: inset 0px 3px 3px 0px rgba(0, 0, 0, 0.2), inset 0px -1px 3px 1px rgba(0, 0, 0, 0.2);
                    box-shadow: inset 0px 3px 3px 0px rgba(0, 0, 0, 0.2), inset 0px -1px 3px 1px rgba(0, 0, 0, 0.2);
                }
            }
            .player-volume{
                flex-grow:1;
                justify-content: flex-end;
            }
        }
    }
</style>


