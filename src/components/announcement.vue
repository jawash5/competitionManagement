<template>
    <div id="announcement">
        {{ announcementName }}

    </div>
</template>

<script>
    export default {
        name: "announcement",
        props: {
            announcementName: String,
        },
        data() {
            return {
                content:'123465',
            }
        },
        methods:{}

    }
</script>

<style scoped>
    #announcement {
        height: 400px;
        width: 850px;
        font-size: 16px;
        text-align: left;
        text-indent: 2em;
        margin: 0 auto;
        padding: 20px;
    }


</style>