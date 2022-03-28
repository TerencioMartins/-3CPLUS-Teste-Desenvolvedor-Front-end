<template>
<div>
    <Todo @btn-click="cliqueBotao()"></Todo>
    <router-view :key="this.keyCount"></router-view>
    </div>
</template>

<script>
import Todo from './todo.vue'
export default {
    components: { Todo },
    emits: ['btn-click'],
    data() {
        return {keyCount: 0}
    },
    methods: {
        cliqueBotao(){
            console.log('clicado');
            this.keyCount++;
            console.log(this.keyCount);
        }
    },
    setup() {

 
    },
}
</script>

<style scoped>

</style>