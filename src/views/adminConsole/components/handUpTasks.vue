<template>
    <el-dialog :visible.sync="visible"
               title="任务分派"
               width="600px"
               center
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false">

      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible">取 消</el-button>
      </span>

    </el-dialog>
</template>

<script>
    export default {
        name: "handUpTasks",
        props:{
            visible: {
                require: true,
                type: Boolean,
                default:false,
            },
        },
        data() {
            return {

            }
        },
        methods:{
            dialogVisible() {
                this.$emit('update:visible', false);
            },

        }

    }
</script>

<style scoped>

</style>