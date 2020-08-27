<template>
    <div id="card" @click="detail">
        <div class="competitionName">
            {{ competitionName }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "competitionCardUser",
        data() {
            return{

            }
        },
        methods:{
            detail:function () {}

        },
        props:{
            competitionName:{
                required: true,
                type: String,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";
    #card {
        margin: 15px;
        width: 280px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 5px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    #card:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .18), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.5s;
    }

    .competitionName {
        text-align: center;
        font-size: 24px;
        font-family: "幼圆" , serif;
        font-weight: 600;
        margin: 20px;
    }
</style>