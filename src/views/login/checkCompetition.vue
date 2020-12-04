<template>
    <div class="checkCompetition">
        <head-login :state="state"></head-login>
        <div class="wrap">
            <el-carousel style="width: 90%; margin: 0 auto" :interval="10000" arrow="hover" type="card" height="400px">
                <el-carousel-item v-for="item in banners" :key="item.id">
                    <el-image style="height: 100%; width: 100%"
                              :src="item.path.replace('-internal', '')"
                              alt="图片"
                              fit="cover"
                              @click="openBanner(item.link)"/>
                </el-carousel-item>
            </el-carousel>
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
                    <el-button class="btns"
                               slot="footer"
                               type="primary"
                               round
                               size="small"
                               @click="getCompetitionDetail(item.id)">查看详情</el-button>
                </competition-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {competitionList, getBanner} from "@/api/login";
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
                ],
                banners:[
                    {id: '', path:'', link:''}
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
                        this.$message.error(error.response.data);
                    });
                }
            },
            getCompetitionDetail (competitionId) {
                const {href} = this.$router.resolve({
                    path: '/competitionDetail',
                    query: {
                        id: competitionId
                    }
                });
                window.open( href, '_blank');
            },
            getBanner() {
                getBanner().then( response => {
                    this.banners = response.data.data
                }).catch( error => {
                    this.$message.error(error.response.data)
                })
            },
            openBanner(url) {
                window.open(url);
            }
        },
        mounted() {
            this.getCompetitionList();
            this.getBanner();
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
            min-height: 680px;
            max-width: 1800px;
            margin: 30px auto;
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
            margin:30px;

            .btns {
                display: block;
                margin: 0 auto;
            }
        }

        /deep/.el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        /deep/.el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
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
