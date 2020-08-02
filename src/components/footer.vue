<template>
    <div id="footer">
        <p class="footer_title">&copy;&nbsp;杭州电子科技大学 All Rights Reserved</p>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped>
    #footer {
        background-color: #333;
        height: 60px;
        display: flex;
        align-items: center;
    }

    .footer_title {
        font-family: "等线" , serif;
        color: #f2f2f2;
        margin: 0 auto;
    }

</style>