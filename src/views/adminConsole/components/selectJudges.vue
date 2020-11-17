<template>
    <el-dialog :visible.sync="visible"
               title="关联 / 取消关联评委"
               width="600px"
               center
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
        <div style="width: 90%; margin: 0 auto">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="教师信息" prop="selectedTeacherInfo">
                    <el-input v-model="form.selectedTeacherInfo"
                              placeholder="请输入教师工号 / 教师姓名"
                              @keydown.enter.native="searchTeacher">
                        <el-button style="border-radius: 0 3px 3px 0;"
                                   type="danger"
                                   slot="suffix"
                                   @click="searchTeacher">查询老师</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="form.getTeachers.length" label="查询结果" prop="getTeachers">
                    <el-radio-group v-model="selectTeacherId">
                        <el-radio v-for="item in form.getTeachers"
                                  :key="item.teacherId"
                                  :label="item.teacherId">{{item.teacherName}}</el-radio>
                    </el-radio-group>
                    <el-button class="pull-right"
                               type="primary"
                               round
                               size="small"
                               @click="relatedTeacher">关联 / 取消关联</el-button>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogClose">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {getTeachersInfo, relatedTeacher} from "@/api/adminConsole";

    export default {
        name: "selectJudges",
        props:{
            visible: {
                require: true,
                type: Boolean,
                default:false,
            },
            competitionId:{
                require: true,
            }
        },
        data() {
            return {
                form: {
                    selectedTeacherInfo: '',
                    getTeachers: [],
                },
                rules: {},
                selectTeacherId:'',
            }
        },
        methods: {
            dialogClose() {
                this.$refs['form'].resetFields();
                this.selectTeacherId = '';
                this.form.getTeachers = [];
                this.$emit('update:visible', false);
            },

            //搜索教师
            searchTeacher()  {
                const selectedTeacherInfo = this.form.selectedTeacherInfo;
                if (selectedTeacherInfo === '') {
                    this.$message('请输入查询教师信息');
                    return false;
                }
                const data = {
                    staffId: /^\d+$/.test(selectedTeacherInfo) ? selectedTeacherInfo : '',
                    teacherName: /^\d+$/.test(selectedTeacherInfo) ? '' : selectedTeacherInfo,
                }

                getTeachersInfo(data).then( res => {
                    const teachers = res.data.data;
                    if (teachers.length === 0) {
                        this.$message('无此老师信息');
                        return false;
                    }
                    for (let teacher of teachers) {
                        this.form.getTeachers.push(teacher);
                    }
                })
            },
            //将选中教师与competitionId关联
            relatedTeacher(){
                let data = new FormData();
                data.append('teacherId', this.selectTeacherId);
                data.append('competitionId', this.competitionId + '');
                relatedTeacher(data).then( res => {
                    this.$message.success(res.data.data.msg);
                }).catch( error => {
                    this.$message.error(error.response.data)
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

    /deep/.el-input__suffix {
        right: 0;
    }
</style>