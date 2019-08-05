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

        // keen ui common styles overwrites to match the demo gif layout
        .ui-textbox{
            
            &__input {
                border: 0;
            }
        }

        .ui-button {
            font-weight: normal;
            text-transform: none;
            cursor: pointer;

            &__icon:only-child {
                margin: 0;
            }
        }
        
        .ui-checkbox{
            
            &__label-text {
                max-width: calc(100% - 1.25rem - 0.5rem);
                word-wrap: break-word;
                overflow-wrap: break-word;
                cursor: default;

                span {
                    cursor: pointer;
                }
            }
        }

        .ui-tabs {
            
            &__body {
                padding: 0;
                border: 0;
            }
        }

        .ui-tab-header-item {
            height: 2.2rem;
            border-radius: 2.2rem;
            text-transform: none;

            &:not(:last-child) {
                margin-right: 20px;
            }

            &.is-active {
                background: #aaa;
            }

            &::after {
                display: none;
            }

            &__text {
                font-weight: normal;
            }
        }
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
</style>
