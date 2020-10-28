<template>
    <div class="main">
        <el-dialog
                :visible.sync="dialogVisible"
                width="300px"
                center
                @open="normalLoadingNum"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <i class="el-icon-loading"></i>
            <div class="number">拼命加载中... {{ loadingNum }}%</div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "progressLoading",
        data() {
            return {
                dialogVisible: false,
                finish: false,
                loadingNum: 0,
            }
        },
        props:{
            isFinished:{
                type: Boolean,
                require: true,
                default: false
            },
            visible:{
                type: Boolean,
                require: true,
                default: false
            }
        },
        watch:{
            visible (newValue) {
                this.dialogVisible = newValue;
            },
            isFinished (newValue) {
                this.finish = newValue;
            }
        },

        methods:{
            normalLoadingNum() {
                this.loadingNum = 0;
                const normal = setInterval( () => {
                    if (this.loadingNum < 99) {
                        this.loadingNum += 1
                    }
                    if (this.finish) {
                        clearInterval(normal);
                        this.fastenLoadingNum();
                    }
                }, 200)
            },
            fastenLoadingNum() {
                const fast = setInterval( () => {
                    if (this.loadingNum < 100) {
                        this.loadingNum += 1
                    } else {
                        clearInterval(fast);
                        this.close();
                    }
                }, 5)

            },
            close() {
                this.dialogVisible = false;
                this.finish = false;
                this.$emit('update:visible', false)
                this.$emit('update:isFinished', false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        text-align: center;

        .el-icon-loading {
            font-size: 30px;
            color: #303133;
        }

        .number {
            margin-top: 10px;
            font-size: 18px;
            color: #303133;
        }

        /deep/.el-dialog__header {
            padding: 0
        }

        /deep/.el-dialog--center .el-dialog__body {
            padding: 10px 20px 10px 20px;
            text-align: center;
        }
    }
</style>