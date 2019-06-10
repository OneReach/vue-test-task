<template>
    <form @submit.prevent="submitForm" class="form-wrap ">
        <ui-textbox placeholder="Add an item here" v-model="newTaskName" v-model.trim="newTaskName" class="form-wrap__input"></ui-textbox>
        <ui-button color="primary"  icon="add">Add</ui-button>
    </form>
</template>

<script>
    export default {
        data () {
            return {
                newTaskName: '',
            }
        },

        methods : {
            submitForm () {
                this.newTaskName.length ? this.$emit('add:task', {name : this.newTaskName, complete : false}) : '';
                this.newTaskName = '';
            }
        }
    };
</script>

<style scoped lang="scss">
    .form-wrap  {
        display: flex;
        justify-content: space-between;
        &__input {
            margin-bottom: 0;
            width: 100%;
            margin-right: 30px;
        }
    }
</style>
