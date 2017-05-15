<template lang="html">
    <ui-tabs type="text">
            <ui-tab title="Pending">
                <ul class="tasks">
                    <li v-for="item in pendingList" :class="{complete : item.complete}">
                        <ui-checkbox v-model="item.complete" @change="passUpdateding(item)">{{item.name}}</ui-checkbox>
                    </li>
                </ul>
            </ui-tab>

            <ui-tab title="Completed">
                <ul class="tasks">
                    <li v-for="item in completedList" :class="{complete : item.complete}">
                        <ui-checkbox v-model="item.complete" @change="passUpdateding(item)">{{item.name}}</ui-checkbox>
                    </li>
                </ul>
            </ui-tab>
        </ui-tabs>
</template>

<script>

export default {
    props: {
        tasks: Array,
        pendingList: Array,
        completedList: Array
    },

    methods: {
        passUpdateding (item) {
            this.$emit('updatedingTrigger', item)
            // console.log(item, 'from child');
        }
    },

    mounted () {
        // console.log(this);
    }
}

</script>

<style lang="scss" scoped>

.tasks {
    height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;

    .complete{
        text-decoration: line-through;
    }
}

</style>

<!-- overwrite keen-ui style -->
<style lang="scss">

.ui-tabs--background-color-default {
    .ui-tabs__header{
        background-color: #fff !important;
    }

    .ui-tab-header-item:hover{
        border-radius: 24px;
    }

    .ui-tab-header-item__text{
        z-index: 1;
    }

    .ui-tabs__body{
        border: 0 !important;
    }

}

.ui-tabs--text-color-active-primary .ui-tab-header-item.is-active{
    color: #fff!important;
}

.ui-tabs--indicator-color-primary .ui-tabs__active-tab-indicator{
    height: 100%;
    border-radius: 24px;
    background-color: rgba(190, 190, 190, 0.61) !important;

}

</style>
