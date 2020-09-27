<template>
    <div id="editor">
        <mavon-editor :toolbars="markdownOption"
                      v-model="handbook"
                      ref="md"
                      style="height: 100%"
                      @change="changeContent"
                      @save="saveContent"
                      @imgAdd="handleEditorImgAdd"
                      @imgDel="handleEditorImgDel">
        </mavon-editor>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import {uploadPicture,deletePicture} from "@/api/adminConsole";
    import {checkStatus} from "@/api/userConsole";

    export default {
        name: "editor",
        components:{mavonEditor},
        data() {
            return {
                handbook:'',
                markdownOption: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                url:''
            }
        },
        props:{
            year:{type:String}
        },
        methods:{
            //内容变化
            changeContent() {
                this.$emit('content',this.handbook)
                // const str = "https://cm-web-files.oss-cn-shanghai.aliyuncs.com/public/电子商务比赛/2019/13e351bc-d993-4c94-8549-05ae5e4e4f5a2.jpg"
                // console.log(str.slice(57,-47))

            },
            //保存
            saveContent() {
                this.$message.success('保存成功！')
                this.$emit('content',this.handbook)
            },
            //添加图片
            handleEditorImgAdd(pos, $file) {
                const data = new FormData()
                data.append('file', $file)
                data.append('year', this.year)

                uploadPicture(data).then(response => {
                    const url = response.data.data;
                    this.url = url;
                    this.$refs.md.$img2Url (pos, url)
                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },
            //删除图片
            handleEditorImgDel() {
                console.log(this.url)
                const fileName = this.url.slice(-41);
                const year = this.url.slice(-46,-42);
                const competitionName = this.url.slice(57,-47);
                const data = {
                    year: year,
                    competitionName: competitionName,
                    filename: fileName
                }
                console.log(data);
                deletePicture(data).then( response => {
                    const id = response.data.data;
                    this.checkStatus(id);
                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },
            //判断状态
            checkStatus(id) {
                const data = new FormData();
                data.append('id', id);
                checkStatus(data).then(response => {
                    const res = response.data.data;
                    if(res === '成功') {
                        this.$message.success('删除成功！');
                        this.$emit('uploadSuccess');
                    } else if (res === '失败') {
                        this.$message.success('删除失败！');
                    } else {
                        this.checkStatus(id);
                    }
                })
            },
        }
    }
</script>

<style scoped>
    #editor {
        margin: auto;
        height: 580px;
    }

    .v-note-wrapper {
        z-index: 100;
    }
</style>