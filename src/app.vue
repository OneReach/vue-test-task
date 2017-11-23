<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name : 'app'
    }
</script>

<style lang="scss">
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        background: #eee;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        display: flex;
    }

    // keen ui reset
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    .ui-textbox__content {
        input {
            border-bottom: 2px solid transparent;

            &:focus {
                border-bottom-color: rgba(33, 150, 243, 1);
            }
        }
    }

    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb {
        &> .vb-dragger {
            &:hover > .vb-dragger-styler {
                background-color: rgba(33, 150, 243, 1);
                margin: 0px;
                height: 100%;
            }

            &> .vb-dragger-styler {
                backface-visibility: hidden;
                transform: rotate3d(0,0,0,0);
                transition:
                    background-color 100ms ease-out,
                    margin 100ms ease-out,
                    height 100ms ease-out;
                background-color: rgba(48, 121, 244,.1);
                margin: 5px 5px 5px 0;
                border-radius: 20px;
                height: calc(100% - 10px);
                display: block;
            }
        }

        &.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
            background-color: rgba(48, 121, 244,.3);
        }

        &.vb-dragging > .vb-dragger > .vb-dragger-styler {
            background-color: rgba(48, 121, 244,.5);
            margin: 0px;
            height: 100%;
        }

        &.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
            background-color: rgba(48, 121, 244,.5);
        }
    }
</style>
