<template>
    <el-dialog :visible.sync="visible"
               title="任务分派"
               width="600px"
               center
               @open="showTeacher"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false">


        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible">取 消</el-button>
        </span>

    </el-dialog>
</template>

<script>
    import {showTeacher} from "@/api/adminConsole";

    export default {
        name: "handUpTasks",
        props:{
            visible: {
                require: true,
                type: Boolean,
                default:false,
            },
            competitionId: {
                require: true,
                type: Number,
            }
        },
        data() {
            return {
                teacherList:[]
            }
        },
        methods:{
            dialogVisible() {
                this.$emit('update:visible', false);
            },
            showTeacher() {
                showTeacher(this.competitionId).then( response => {
                    this.teacherList = response.data.data;
                })
            }

        }

    }
</script>

<style scoped>

</style>