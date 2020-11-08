<template>
    <div class="checkCompetition">
        <head-login :state="state"></head-login>
        <div class="wrap">
            <div class="competitionSelect">
                <el-select v-model="selectValue" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="competitionList">
                <competition-card v-for="item in competitionList"
                                  :key="item.id"
                                  :competition="item">
                </competition-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {competitionList} from "@/api/login";
    import headLogin from "@/views/login/components/headLogin";
    import competitionCard from "@/views/login/components/competitionCard";
    import {getCode} from "@/utils/app";

    export default {
        name: "checkCompetition",
        components:{
            "headLogin": headLogin,
            "competitionCard":competitionCard
        },
        data(){
            return{
                competitionList:JSON.parse(sessionStorage.getItem('competitionList')) || [],
                selectValue:'全部比赛',
                options:[
                    {value: '选项1', label: '全部比赛'}
                ]
            }
        },
        computed:{
            state() {
                return getCode() === '0';
            },
        },
        methods: {
            getCompetitionList() {
                if (this.competitionList.length === 0 ) {
                    competitionList().then(response => {
                        this.competitionList = response.data.data
                        sessionStorage.setItem('competitionList', JSON.stringify(this.competitionList))
                    }).catch(error => {
                        this.$message.error('服务器开小差啦~');
                        console.log(error);
                    });
                }
            },
            flesh() {
                if(this.$route.params.flesh === 'true') {
                    sessionStorage.removeItem('competitionList')
                }
            }
        },
        mounted() {
            this.flesh();
            this.getCompetitionList();
        }
    }
</script>

<style lang="scss" scoped>
    .checkCompetition {
        height: 100vh;
        min-height: 800px;
        background-color: #f7f7f7;

        .wrap {
            height: 100vh;
            margin-top: 30px;
            min-height: 680px;
        }

        .competitionSelect {
            margin-left: 50px;
        }

        .competitionList {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            /*justify-content: space-around;*/
            justify-content: flex-start;
            margin:30px
        }
    }

    @media screen and (max-width: 420px){

        #checkCompetition {
            min-width: 0;
            max-width: 2000px;
        }

        .competitionList {
            display: flex;
            width: 80vw;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            /*justify-content: space-around;*/
            justify-content: flex-start;
        }

        .competitionSelect {
            margin-left: 0;
        }

        /deep/.card{
            margin-left: 10vw;
        }

    }

</style>
