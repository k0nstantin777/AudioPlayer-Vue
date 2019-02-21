<template lang="pug">
    section.container
        div.player.player-aria
            div.player-box.player-main-panel
                div.player-controls
                    span.fa.fa-step-backward
                div.player-track
                   progress#progressbar(value="50" max="100") 
                div.player-volume
                   input(type="range") 
            div.player-box.player-search
                input(type="search" placeholder="Search for artist or tracks")
            ul.player-box.player-track-list
                li(v-for="track in tracks" :class="{active:track.isActive}") 
                    span.track-info {{track.name}} - {{track.athtor}} 
                    span.track-duration {{track.duration}}

</template>
<script>
export default {
    data: function(){
        return {
            tracks: [
                {
                    id: 1,
                    athtor: 'Лепс',
                    name: 'Рюмка водки на столе',
                    duration: '4:32',
                    isActive: true,
                },
                {
                    id: 2,
                    athtor: 'Вера Брежнева',
                    name: 'Ласточка моя',
                    duration: '3:22',
                    isActive: false,
                },
                 {
                    id: 3,
                    athtor: 'Руки Вверх',
                    name: 'Крошка моя',
                    duration: '5:12',
                    isActive: false,
                }
            ]
        }
    }
}
</script>
<style lang="scss">
    .player{
        &.player-aria{
            display:flex;
            flex-wrap: wrap;
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
        .player-main-panel{
            display:flex;
            justify-content: space-between;
            .player-controls{
                flex-grow:1
            }
            .player-track{
                flex-grow:4;
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
                flex-grow:1
            }
        }
        .player-search{
            input[type=search]{
                width:100%;
                height: 30px;
                border-radius: 5px;
                background: #989494;
                border: 1px solid #fff;
                font-size: 1.5em;
                padding: 0 10px;
            }
        }
        .player-track-list{
            border: 1px solid #fff;
            background: #989494;
            border-radius: 5px;
            font-size: 1.2em;
            color: #272e76;
            li{
                list-style: none;
                height: 20px;
                padding: 5px;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                justify-content: center;
                span{
                    &.track-duration{
                        align-self: flex-end;
                    }
                }
            }
            li:not(:last-child){
                border-bottom: 1px solid #fff;
            }
        }
    }
</style>


