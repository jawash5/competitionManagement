<template>
    <div>
        <head-menu></head-menu>
    </div>
</template>

<script>
    import headMenu from "@/components/headMenu.vue";

    export default {
        name: "signUp",
        data() {
            return{
            }
        },
        components:{
            "headMenu":headMenu,
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
</style>