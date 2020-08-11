<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu></admin-menu>
            <div id="releaseAnnouncement">
                <div id="announcementForm">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="标题">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="赛事选择">
                            <el-select v-model="form.competitionType" placeholder="请选择赛事">
                                <el-option label="赛事一" value="shanghai"></el-option>
                                <el-option label="赛事二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="公告内容">
                            <el-input type="textarea" :rows="10" v-model="form.context"></el-input>
                        </el-form-item>

                        <el-form-item label="是否发送通知">
                            <el-switch v-model="form.sendNotice"></el-switch>
                        </el-form-item>

                        <el-form-item label="相关文件上传">
                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-change="handleChange"
                                    :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
<!--                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                            </el-upload>
                        </el-form-item>

                        <div class="formButton">
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </div>


                    </el-form>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import adminMenu from "@/components/adminMenu";

    export default {
        name: "releaseAnnouncement",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter,
            'adminMenu':adminMenu
        },
        data() {
            return {
                statement:false,
                fileList:[],
                form: {
                    name: '',
                    competitionType: '',
                    context: '',
                    sendNotice: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            };
        },
        methods: {
        }
    }
</script>

<style scoped src="../styles/adminManagement/releaseAnnouncement.css">

</style>