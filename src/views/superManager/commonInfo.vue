<template>
    <div>
        <el-row type="flex" justify="space-around">
            <el-col :span="6">
                <el-card>
                    <div class="title">Tag管理</div>
                    <el-divider></el-divider>
                    <div class="tagList">
                        <el-tag class="tag"
                                v-for="(tag,index) in tags"
                                :key="index"
                                closable
                                @close="deleteTag(tag.tagName, index)"
                                :type="tagType[Math.floor(Math.random()* 5)]">
                            {{tag.tagName}}
                        </el-tag>

                        <el-input
                                class="input-new-tag"
                                v-if="visible.inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="10">
                <el-card>
                    <div class="title">轮播图管理
                        <el-button class="pull-right"
                                   type="primary"
                                   size="small"
                                   @click="visible.newBanner = true">新增</el-button>
                        <el-dialog
                                title="新建轮播图"
                                :visible.sync="visible.newBanner"
                                center
                                width="30%">
                            <el-form :model="bannerForm" label-width="50px" ref="bannerForm">
                                <el-form-item label="链接">
                                    <el-input v-model="bannerForm.link" placeholder="跳转链接"></el-input>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-upload
                                            action="#"
                                            :limit="1"
                                            :on-change="fileChange"
                                            :on-remove="() => {bannerForm.file = ''}"
                                            :file-list="fileList"
                                            :auto-upload="false">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <span style="margin-left: 1rem" slot="tip" class="el-upload__tip">至多上传一张图片</span>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="createBanner">确 定</el-button>
                            </span>
                        </el-dialog>

                    </div>
                    <el-divider></el-divider>
                    <div style="position: relative">
                        <el-carousel arrow="hover" type="card" height="150px" :autoplay="false">
                            <el-carousel-item v-for="item in banners" :key="item.id">
                                <el-button class="button--close"
                                           circle
                                           size="mini"
                                           icon="el-icon-close"
                                           @click="deleteBanner(item.id)"></el-button>
                                <el-image :src="item.path.replace('-internal', '')" alt="图片" fit="cover"/>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getBanner, getTag} from "@/api/login";
    import {createBanner, deleteBanner, editTag} from "@/api/superManager";

    export default {
        name: "commonInfo",
        data() {
            return {
                tags:[],
                tagType: ['success', 'info', 'warning', 'danger'],
                visible:{
                    inputVisible: false,
                    newBanner: false
                },
                inputValue: '',
                banners:[
                    {id: '', path:'', link:''}
                ],
                bannerForm:{
                    link:'',
                    file:''
                },
                fileList:[],

            }
        },
        methods:{
            getTags() {
                getTag().then( response => {
                    this.tags = response.data.data;
                })
            },
            deleteTag(name, index) {
                this.$confirm(`此操作将删除 Tag ${name}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new FormData;
                    data.append('tag', name)
                    editTag(data).then( response => {
                        const res = response.data.data
                        if (res.success) {
                            this.tags.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                        }
                    }).catch( error => {
                        this.$message.error( error.response.data);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showInput() {
                this.visible.inputVisible = true;
                this.$nextTick( () => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    let data = new FormData;
                    data.append('tag', inputValue);
                    editTag(data).then( response => {
                        const res = response.data.data
                        if (res.success) {
                            this.tags.push({tagName: inputValue, tagId: ''});
                            this.$message.success(res.msg)
                        }
                    })
                }
                this.visible.inputVisible = false;
                this.inputValue = '';
            },

            getBanner() {
                getBanner().then( response => {
                    this.banners = response.data.data
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            },
            deleteBanner(bannerId) {
                this.$confirm('此操作不可撤回, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new FormData;
                    data.append("bannerId", bannerId);
                    deleteBanner(data).then(() => {
                        this.$message.success('删除成功')
                    }).catch( error => {
                        this.$message.error(error.response.data)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            fileChange(file) {
                this.bannerForm.file = file.raw;
            },
            createBanner() {
                let data = new FormData;
                data.append('file', this.bannerForm.file);
                data.append('link', this.bannerForm.link);

                createBanner(data).then(() => {
                    this.$message.success('新建成功');
                    this.$refs.bannerForm.resetFields();
                    this.visible.newBanner = false;
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            }
        },
        mounted() {
            this.getTags();
            this.getBanner();
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
        color: #303133;
        font-size: 20px;
        line-height: 32px;
    }

    .el-tag {
        margin: 10px 10px 0 0;
    }

    .tagList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;

    }

    .button-new-tag {
        margin-top: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-top: 10px;
        vertical-align: bottom;
    }
    .button--close {
        position: absolute;
        top: 5%;
        right: 5%;
        padding: 5px;
        z-index: 1;
        font-size: 10px;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>