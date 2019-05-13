<template>
    <div
        class="moving-el"
        :style="cssVariables"
    >
        <slot />
    </div>
</template>

<script>
    export default {
        name : 'MovingElement',
        props: {
            stylesParams: {
                type: Object,
                default: () => ({
                    x: 0,
                    y: 0,
                    opacity: 0,
                }),
            },
            animationDuration: {
                type: [Number, String],
                default: 500
            }
        },
        computed: {
            cssVariables() {
                return {
                    '--y-position': `${this.stylesParams.y.toFixed(1)}px`,
                    '--x-position': `${+this.stylesParams.x.toFixed(1) + 30}px`,
                    '--opacity': this.stylesParams.opacity,
                    '--animation-duration': `${this.animationDuration}ms`
                }
            }
        },
    };
</script>

<style lang="scss">
    .moving-el {
        opacity: var(--opacity);
        transform: translate(var(--x-position), var(--y-position));
        position: fixed;
        top: 0;
        left: 0;
        transition: transform var(--animation-duration);
    }
</style>
