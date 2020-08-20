<template>
    <div id="checkCompetition">
        <head-login :state="true"></head-login>
        <div>
            <el-tabs v-model="activeName" tab-position="left" type="border-card" id="tabWrap" >
                <el-tab-pane v-for="(item, index) in competitionInfo" :key="index" :label="item.name" name="index">
                    <competition :competition-name="item.name"></competition>
                </el-tab-pane>
            </el-tabs>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import competition from "@/components/competition";

    export default {
        name: "checkCompetition2",
        components:{
            "headLogin": headLogin,
            "myFooter": myFooter,
            "competition":competition
        },
        data(){
            return{
                activeName: 1,
                competitionInfo: [
                    {
                        name:'电子商务竞赛',
                    }
                ]
            }
        },
        method:{

        },
        mounted:{
            // getConpetition().then(response => {
            //     this.competitionInfo = response.data;
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    }
</script>

<style scoped src="../styles/checkCompetition/checkCompetition.css"></style>