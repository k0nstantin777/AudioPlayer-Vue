<template lang="pug">
    div.player-box.player-main-panel.flex.justify-space-between
        div.player-controls
            span.icon.fa.fa-step-backward(@click="$emit('on-previous')")
            span.icon.fa(:class="{'fa-play':!isPlay, 'fa-pause':isPlay}" @click="tooglePlay()")
            span.icon.fa.fa-step-forward(@click="$emit('on-next')")
        div.player-track.flex.align-center
            progress#progressbar(:value="progress" :max="duration")
            audio#track(:src="currentTrack ? currentTrack.link : null") 
        div.player-volume.flex.align-center
            input(
                min="0" max="1" step="0.05"
                type="range"
                @input="setVolume($event.target.value)"
                v-bind:value="volume"
            ) 
</template>
<script>
export default {
    props: ['isPlay'],
    data: function(){
        return {
            audioElement: null,
            progressBarElement: null,
            volume: 1,
            progress: 0,
            duration: 0,
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
        },
        getDuration(){
            return Math.ceil(this.audioElement.duration);
        },
        progressBarInit(){
            const self = this;
            setTimeout(function(){
                if(self.isPlay && self.progress < self.duration){
                    self.progress = (+self.progress + 0.01).toFixed(2);
                    self.progressBarInit();
                }
            }, 10);
        },
        initEvents(){
            const self = this;
            this.audioElement.ontimeupdate = function(){
                self.progress = this.currentTime;
            };
            this.audioElement.onended = function(){
                self.$emit('on-next');
            };    
            this.progressBarElement.onclick = function(e){
                let progressPercent = e.offsetX/this.offsetWidth;
                self.audioElement.currentTime = self.audioElement.duration * progressPercent;
            }
        }
    },
    watch: {
        isPlay (newValue){
            if(!this.currentTrack){
                return;
            }
            if(newValue){
                const self = this;
                this.audioElement.play().then(function(){
                    self.duration = self.getDuration();
                    self.initEvents();
                });
            } else {
                this.audioElement.pause();    
            }
        },
    },
    mounted() {
        this.audioElement = document.querySelector('audio#track');
        this.progressBarElement = document.querySelector('progress#progressbar');
    }
}
</script>
<style lang="scss">
    .player{
        .player-main-panel{
            @media screen and (max-width: 760px) {
                flex-wrap: wrap;
            }
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
                @media screen and (max-width: 760px) {
                    flex-basis: 100%;
                    margin-bottom: 20px;
                    justify-content: center;
                    display: flex;
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
                    transition: all 0.1s;
                    -webkit-box-shadow: inset 0px 3px 3px 0px rgba(0, 0, 0, 0.2), inset 0px -1px 3px 1px rgba(0, 0, 0, 0.2);
                    box-shadow: inset 0px 3px 3px 0px rgba(0, 0, 0, 0.2), inset 0px -1px 3px 1px rgba(0, 0, 0, 0.2);
                }
                @media screen and (max-width: 760px) {
                    flex-basis: 100%;
                    margin-bottom: 20px;
                    justify-content: center;
                } 
            }
            .player-volume{
                flex-grow:1;
                justify-content: flex-end;
                @media screen and (max-width: 760px) {
                    flex-basis: 100%;
                    justify-content: center;
                } 
            }
        }
    }
</style>


