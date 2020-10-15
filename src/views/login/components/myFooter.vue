<template>
    <div id="myFooter">
        <p class="footer_title">&copy;&nbsp;THE BLEND All Rights Reserved</p>
    </div>
</template>

<script>
    export default {
        name: "myFooter"
    }
</script>

<style scoped>
    #myFooter {
        background-color: #333;
        height: 60px;
        display: flex;
        align-items: center;
        min-height: 60px;
        min-width: 1200px;
    }

    .footer_title {
        font-size: 12px;
        font-family: "等线" , serif;
        color: #f2f2f2;
        margin: 0 auto;
    }

</style>