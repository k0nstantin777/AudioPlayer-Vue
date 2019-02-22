<template lang="pug">
    div.player-box.player-main-panel.flex.justify-space-between
        div.player-controls
            span.icon.fa.fa-step-backward
            span.icon.fa(:class="{'fa-play':!play, 'fa-pause':play}" @click="togglePlay()")
            span.icon.fa.fa-step-forward
        div.player-track.flex.align-center
            progress#progressbar(value="50" max="100")
            audio#track(:src="playingTrack.link") 
        div.player-volume.flex.align-center
            input(type="range") 
</template>
<script>
export default {
    attrs: [play],
    data: function(){
        return {
            play: false,
        }
    },
    computed: {
        playingTrack (){
            return this.$store.state.currentTrack;
        } 
    },
    watch: {
        play (newValue, OldValue){
            if(newValue){
                this.play = false;
                document.querySelector('audio#track').pause();
            } else {
                this.play = true;
                document.querySelector('audio#track').play();    
            }
        }
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


