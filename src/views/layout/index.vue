<template>
    <div id="layout">
        <layout-header></layout-header>
        <layout-main></layout-main>
        <layout-nav></layout-nav>
    </div>
</template>

<script>
    import layoutHeader from "@/views/layout/components/Header";
    import layoutMain from "@/views/layout/components/Main";
    import layoutNav from "@/views/layout/components/Nav";

    export default {
        name: "index",
        components:{layoutHeader,layoutMain,layoutNav},
    }
</script>

<style lang="scss" scoped>
    #layout {
        background-color: #f7f7f7;
    }
</style>