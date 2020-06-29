<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "main";

    html, body{
        height: 100%;
    }

    #app{
        min-height: 100%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*padding: 30vh 0;*/
        display: flex;
        align-items: center;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
