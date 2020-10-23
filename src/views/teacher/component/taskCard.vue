<template>
    <el-card class="taskCard">
        <div slot="header" class="cardHeader">
            <span>{{info.year}}年 {{info.name}}</span>
        </div>
        <el-button class="button"
                   type="primary"
                   size="small"
                   round
                   @click="toMark">打分</el-button>
    </el-card>
</template>

<script>
    export default {
        name: "taskCard",
        props:{
            info:{
                type: Object,
                require: true,
                default: () => {
                    return {
                        id: 0,
                        name: "",
                        year: ""
                   }
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {
            toMark() {
                this.$router.push({
                    path: '/teacherConsole/markGroup',
                    query: {
                        id: this.info.id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .taskCard {
        width: 20%;
        margin: 20px 2.5%;

        .cardHeader {
            font-size: 14px;
            color: #303133;
        }

        .button {
            display: block;
            margin: 0 auto;
        }
    }
</style>