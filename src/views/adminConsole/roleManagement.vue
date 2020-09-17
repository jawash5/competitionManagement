<template>
    <div id="roleManagement">
        <el-button type="danger" size="small" class="pull-right classButton" @click="dialogVisible = true">新增</el-button>
        <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="50"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="roleId"
                    label="ID"
                    align="center"
                    width="80">
            </el-table-column>

            <el-table-column
                    prop="roleName"
                    label="角色名称"
                    align="center"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    prop="permission"
                    label="权限内容"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="200"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="dialogVisible2 = true">修改</el-button>

                    <el-dialog
                            title="修改权限"
                            :visible.sync="dialogVisible2"
                            center
                            width="500px">
                        <el-form :model="editRoleInfo" label-width="80px">
                            <el-form-item label="具体权限">
                                <el-checkbox-group v-model="checkedList">
                                    <el-checkbox v-for="item in checkList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>

                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="editPermission(scope.$index)">确 定</el-button>
                        </span>
                    </el-dialog>

                    <el-button
                            size="mini"
                            @click="deleteRolePermission(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="新增角色"
                :visible.sync="dialogVisible"
                center
                width="500px">
            <el-form :model="newRoleInfo" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input placeholder="请输入角色名称" v-model="newRoleInfo.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input placeholder="请输入角色描述" type="textarea" :rows="2" v-model="newRoleInfo.roleDescription"></el-input>
                </el-form-item>
                <el-form-item label="具体权限">
                    <el-checkbox-group v-model="checkedList">
                        <el-checkbox v-for="item in checkList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRolePermission">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {getRoles,deleteRoles, addRoles, editRoles} from "@/api/adminConsole";

    export default {
        name: "roleManagement",
        data() {
            return {
                tableData:[],//表格内内容
                dialogVisible:false, //对话框
                dialogVisible2:false,
                checkList:[
                    {id:100009, name:'参加比赛'},
                    {id:100005, name:'修改个人信息'},
                    {id:100006, name:'上传文件'},
                    {id:100004, name:'修改小组信息'},
                    {id:100007, name:'获取小组信息'},
                    {id:100002, name:'发送邮件'},
                    {id:100003, name:'创建比赛'},
                    {id:100008, name:'发布公告'},
                    {id:100010, name:'修改公告'},
                    {id:100011, name:'修改小组权限'},
                ],//权限列表
                checkedList:[], //权限选择列表
                newRoleInfo:{
                    roleName:'',
                    roleDescription:'',
                    permissions:[]
                },
                editRoleInfo:{
                    permissions:[]
                }
            }
        },
        methods:{
            //获取角色信息
            getPermission() {
                getRoles().then(response => {
                    const permissionDetail = response.data.data;
                    // console.log(permissionDetail);
                    for (let i=0; i<permissionDetail.length; i++) {
                        const roleId = permissionDetail[i].id;
                        const role = permissionDetail[i].role;
                        const permission = [];
                        for(let j=0; j<permissionDetail[i].permissions.length; j++) {
                            permission.push(permissionDetail[i].permissions[j].description)
                        }
                        const permissionString = permission.join(" , ");
                        this.tableData.push({roleId: roleId, roleName: role, permission: permissionString})
                        // console.log(this.tableData)
                    }
                }).catch( error => {
                        this.$message.error(error.response.message);
                    }
                )
            },

            //新增角色权限信息
            addRolePermission() {
                for(let i=0; i<this.checkedList.length; i++) {
                    this.newRoleInfo.permissions.push(parseInt(this.checkedList[i]))
                }
                // eslint-disable-next-line no-unused-vars
                addRoles(this.newRoleInfo).then( response => {
                    this.dialogVisible = false;
                    this.tableData = [];
                    this.getPermission();
                })
            },

            //修改权限信息
            editPermission(index) {
                this.dialogVisible2 = true;
                const roleId = this.tableData[index].roleId;
                const permission = this.checkedList;
                const data = { permissions: permission, roleId: roleId };
                console.log(data)
                // eslint-disable-next-line no-unused-vars
                editRoles(data).then(response => {
                    this.tableData = [];
                    this.getPermission();
                    this.dialogVisible2 = false;
                })
            },

            //删除角色
            deleteRolePermission(index) {
                const roleId = this.tableData[index].roleId;
                const data = new FormData();
                data.append('roleId',roleId);
                // eslint-disable-next-line no-unused-vars
                deleteRoles(data).then( response => {
                    this.tableData = [];
                    this.getPermission();
                });

            }
        },
        mounted() {
            this.getPermission();
        },
    }
</script>

<style lang="scss" scoped>
    #roleManagement {
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 20px;
    }
</style>