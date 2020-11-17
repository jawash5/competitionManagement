<template>
    <el-dialog :visible.sync="visible"
               title="任务分派/取消"
               width="500px"
               center
               @open="showTeacher"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
        <div>已关联评委：</div>
        <el-checkbox-group style="margin: 15px 30px 0 30px" v-model="checkTeacherIds">
            <el-checkbox v-for="item in teacherList"
                      :key="item.teacherId"
                      :label="item.teacherId">{{item.teacherName}}</el-checkbox>
        </el-checkbox-group>

        <div class="div-30"></div>
        <div class="tip">Tip：若该评委已绑定某任务，重复绑定该任务将取消绑定</div>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="teacherRelated">确定</el-button>
            <el-button @click="dialogVisible">取 消</el-button>
        </span>

    </el-dialog>
</template>

<script>
    import {showTeacher, toggleRelated} from "@/api/adminConsole";
    import {getGroupFiles} from "@/api/userConsole";

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
            }
        },
        data() {
            return {
                teacherList: [],
                checkTeacherIds: []
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
            },
            //将选中教师和fileId关联
            teacherRelated() {
                const chosenGroups = this.$store.getters['sendNotice/chosenGroups'];
                let groupFileIds = [];
                for (let group of chosenGroups){
                    getGroupFiles(group.id).then( res => {
                        const info = res.data.data;
                        for (let i of info){
                            groupFileIds.push(i.fileId)
                        }
                    })
                }
                this.$confirm(`是否将选中的 ${chosenGroups.length} 支队伍的项目文件派发/(取消派发）给已选择的关联教师？`)
                .then( () => {
                    const data = {
                        fileId:groupFileIds,
                        teacherId:this.checkTeacherIds
                    };
                    toggleRelated(data).then(res => {
                        this.$message.success(res.data.data.msg);
                        groupFileIds = [];
                        this.checkTeacherIds = [];
                    }).catch( error => {
                        this.$message.error(error.response.data)
                    });
                }).catch( () => {});
            },

        }

    }
</script>

<style lang="scss" scoped>
    .tip {
        text-align: center;
        font-size: 12px;
        color: #909399;
    }
</style>