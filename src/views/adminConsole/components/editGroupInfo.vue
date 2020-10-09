<template>
    <div>
        <el-dialog
                title="修改资料"
                :visible.sync="visible"
                center
                width="800px"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                @open="openDialog">
            <div style="margin: 0 50px">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-form-item label="队伍名称">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="队长姓名">
                                <el-input v-model="editForm.captainName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="队伍邮箱">
                                <el-input v-model="editForm.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="角色管理">
                        <el-radio v-for="item in authority"
                                  :key="item.id"
                                  v-model="editForm.role" :label="item.id">{{item.role}}</el-radio>
                    </el-form-item>

                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getRoles} from "@/api/adminConsole";

    export default {
        name: "editGroupInfo",
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            groupInfo:{
                type: Object,
                require:true,
            },
        },
        data() {
            return {
                //修改信息表单参数
                editForm:{
                    name: '',
                    captainName: '',
                    email: '',
                    role: ''
                },
                authority:[],//权限列表
            }
        },
        methods:{
            dialogClose() {
                this.$emit("update:dialogClose",false);
            },
            //提交修改表单
            submitEditForm() {
                this.dialogClose()
            },
            //打开对话框
            openDialog() {
                this.editForm = this.groupInfo;
                if(this.authority.length === 0) {
                    this.getRoles();
                }
                // console.log(this.editForm.role)
            },

            //获取权限角色
            getRoles() {
                getRoles().then(response => {
                    this.authority = response.data.data;
                }).catch( error => {
                    this.$message.error(error.response);
                })
            },
        }
    }
</script>

<style scoped>

</style>