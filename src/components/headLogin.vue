<template>
    <div id="login_head">
        <router-link to="myProject"><h1 id="login_head_title">竞赛管理系统</h1></router-link>
        <div id="rooter" v-if="state">
            <router-link to="login" class="router_url">登录</router-link>
            <span class="register_hr"></span>
            <router-link to="loginAdmin" class="router_url">管理员入口</router-link>
            <span class="register_hr"></span>
            <router-link to="checkCompetition" class="router_url">查看比赛</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headLogin",
        props: {
            state: Boolean
        },
    }
</script>

<style scoped>
    #login_head {
        background-color: #409EFF;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 60px;
    }

    #login_head_title {
        font-family:"等线" , serif;
        color: #f2f2f2;
        padding: 0 100px;
    }

    #rooter {
        padding: 0 100px;
    }

    a:hover {
        text-decoration: none;
        color: yellow;
    }

    .router_url {
        font-family:"等线" , serif;
        color: white;
        padding: 0 10px;
        font-size: 14px;
    }

    .register_hr {
        border:0.5px solid #FFFFFF;
        height:10px;
    }
</style>