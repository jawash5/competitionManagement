<template>
    <div class="competitionList">
        <competition-card v-for="item in competitionList"
                          :key="item.id"
                          :competition="item"></competition-card>
    </div>
</template>

<script>
    import competitionCard from "@/views/login/components/competitionCard";
    import {competitionList} from "@/api/login";
    export default {
        name: "editCompetitionInfo",
        components:{competitionCard},
        data() {
            return {
                competitionList:JSON.parse(sessionStorage.getItem('competitionList')) || [],
            }
        },
        methods: {
            getCompetitionList() {
                if (this.competitionList.length === 0 ) {
                    competitionList().then(response => {
                        this.competitionList = response.data.data
                        sessionStorage.setItem('competitionList', JSON.stringify(this.competitionList))
                    }).catch( error => {
                        this.$message.error(error.response.data);
                    });
                }
            },
        },
        mounted() {
            this.getCompetitionList();
        }

    }
</script>

<style lang="scss" scoped>
    .competitionList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: space-around;
    }

    @media screen and (max-width: 1400px) {
        .card {
            margin: 1.5 * 16px calc((100% - 45 * 16px) / 6);
        }
    }

    @media screen and (max-width: 1100px) {
        .card {
            margin: 1.5 * 16px calc((100% - 30 * 16px) / 4);
        }
    }

    @media screen and (max-width: 850px) {
        .card {
            margin: 1.5 * 16px calc((100% - 15 * 16px) / 2);
        }
    }
</style>