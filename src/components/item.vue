<script>
    import Vue from 'vue';
    let item = Vue.component('item', {
        props: ['name', 'completed'],
        template: '<label><ui-checkbox v-model="completed" @change="changeStatus">{{name}}</ui-checkbox></label>',
        methods: {
            changeStatus : function () {
                this.$emit('changeStatus');
            }
        }
    });
    export default item;
</script>

