<template lang="pug">
    div.player-box.player-search
        input(
            type="search"
            placeholder="Search for artist or tracks"
            @input="$emit('on-search', $event.target.value)"
        )
</template>
<script>
export default {}
</script>
<style lang="scss">
    .player{
        .player-search{
            input[type=search]{
                width:100%;
                height: 30px;
                border-radius: 5px;
                background: #989494;
                border: 1px solid #fff;
                font-size: 1.5em;
                padding: 0 10px;
                color: #272e76;
                &:focus, &:active {
                    outline: none;
                }
            }
        }
    }
</style>


