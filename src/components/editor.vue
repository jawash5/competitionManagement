<template>
    <div id="editor">
        <mavon-editor :toolbars="markdownOption"
                      v-model="handbook"
                      ref="md"
                      style="height: 100%"
                      @save="saveContent()"
                      @imgAdd="handleEditorImgAdd"
                      @imgDel="handleEditorImgDel">
        </mavon-editor>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import {uploadPicture} from "@/api/adminConsole";

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
                }
            }
        },
        props:{
            year:{type:String, required:true}
        },
        methods:{
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
                    const url = response.data.data
                    this.$refs.md.$img2Url (pos, url)
                }).catch(error => {
                    this.$message.error(error.response.data)
                })
            },
            //删除图片
            handleEditorImgDel() {
                // const formdata = new FormData()
                // formdata.append('url', pos[0])
                // delfile(formdata)
                //     .then(() => {
                //         Message.success('删除成功')
                //     })
                //     .catch(res => {
                //         console.log(res)
                //     })
            }
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