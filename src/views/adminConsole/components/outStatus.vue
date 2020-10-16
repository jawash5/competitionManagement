<template>
    <div>
        <el-dialog :visible="visible"
                   title="淘汰管理"
                   width="420px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="pull-center">
                <el-radio v-model="promoteChoice" :label="true">淘汰</el-radio>
                <el-radio v-model="promoteChoice" :label="false">恢复晋级</el-radio>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="changeOutStatus">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {outTeam} from "@/api/adminConsole";

    export default {
        name: "outStatus",
        data() {
            return {
                promoteChoice:true,//是否选择淘汰
            }
        },
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            stageValue:{
                require: true,
            },
        },
        methods:{
            dialogClose() {
                this.$emit("update:dialogClose",false);
            },
            changeOutStatus() {
                const chosenGroups = this.$store.getters['sendNotice/chosenGroups']
                let groupIds = [];
                for (const group of chosenGroups) {
                    groupIds.push(group.id);
                }
                const data = {
                    stageId: this.stageValue,
                    groupIds: groupIds,
                    isOut: this.promoteChoice
                }
                outTeam(data).then( () => {
                    if(data.isOut === true) {
                        this.$message.success('淘汰队伍成功');
                    } else {
                        this.$message.success('恢复晋级队伍成功');
                    }
                    this.$emit("success");
                    this.dialogClose();
                })
            }
        }

    }
</script>

<style scoped>

</style>