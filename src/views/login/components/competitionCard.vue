<template>
    <div class="card">
<!--        <el-image :src="competition.mainImage"></el-image>-->
        <div :class="titleClass">{{ competition.name }}</div>
        <div class="tag">
            <el-tag size="small"
                    :type="tagType[Math.floor(Math.random()* 5)]"
                    v-for="item in tagList"
                    :key="item.tagId">{{item.tagName}}</el-tag>
        </div>
        <el-divider></el-divider>
        <span class="title2" v-if="competition.hasOwnProperty('year')">举办时间：{{ competition.year }} 年 </span>
        <span class="title2" v-if="competition.hasOwnProperty('session')">| 第 {{ competition.session }} 届</span>
        <div class="div-content"></div>
        <div class="time">比赛时间：{{ competition.start.slice(0,-3) }}
        </div>
        <div class="time pull-right">
            <span class="left">至</span>
            {{ competition.end.slice(0,-3) }}
        </div>
        <div class="div-content"></div>
        <slot name="footer"></slot>
<!--        <el-button class="btn" type="primary" size="small" round @click="getCompetitionDetail">查看详情</el-button>-->

    </div>
</template>

<script>
    import {getTag} from "@/api/login";

    export default {
        name: "competitionCard",
        props:{
            competition:{
                required: true,
                type: Object,
                default: () => {}
            }
        },
        data() {
            return{
                tagList: JSON.parse(sessionStorage.getItem(`tag${this.competition.id}`)) || '',
                tagType: ['success', 'info', 'warning', 'danger'],
            }
        },
        computed:{
            titleClass() {
                if (this.competition.name.length > 10) {
                    return 'title--long';
                } else {
                    return 'title'
                }
            }
        },
        methods:{
            getTag() {
                if (!sessionStorage.getItem(`tag${this.competition.id}`)) {
                    getTag(this.competition.id).then( response => {
                        const res = response.data.data;
                        sessionStorage.setItem(`tag${this.competition.id}`, JSON.stringify(res));
                        this.tagList = res;
                    })
                }
            }
        },
        mounted() {
            this.getTag();
        }
    }
</script>

<style lang="scss" scoped>
    $standard: 16px;
    .card {
        width: 13 * $standard;
        height: 13 * $standard;
        margin: 1.5 * $standard calc((100% - 75 * #{$standard}) / 10);
        padding: 1 * $standard;
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .title {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 2.5 * $standard;
            padding: 0 2 * $standard;
            text-align: center;
            font-size: 1.2 * $standard;
            font-family: "Microsoft YaHei", serif;
            color: #303133;
        }

        .title--long {
            padding: 0 .5 * $standard;
            text-align: center;
            font-size: 1.2 * $standard;
            font-family: "Microsoft YaHei", serif;
            color: #303133;
        }

        .tag {
            text-align: center;
            margin: 1 * $standard 0 0 0;
            min-height: 24px    ;

            .el-tag + .el-tag {
                margin-left: 10px;
            }
        }

        .title2 {
            font-size: .9 * $standard;
            color: #606266;
        }
;
        .time {
            font-size: .8 * $standard;
            line-height: 1.2 * $standard;
            color: #909399;
        }

        .div-content {
            height: .5 * $standard;
            clear: both;
        }

        /deep/.el-divider--horizontal {
            margin: .5 * $standard 0 .5 * $standard 0;
        }

        &:hover {
            box-shadow: 0 0 .8 * $standard rgba(0, 0, 0, .18), 0 0 1 * $standard rgba(0, 0, 0, .04);
            transition: box-shadow 0.3s;
        }
    }

    @media screen and (min-width: 1800px){
        margin: 2 * $standard;
    }

    @media screen and (max-width: 1400px){;
        .card {
            margin: 1.5 * $standard calc((100% - 60 * #{$standard}) / 8);
        }
    }

    @media screen and (max-width: 1150px){
        .card {
            margin: 1.5 * $standard calc((100% - 45 * #{$standard}) / 6);
        }
    }

    @media screen and (max-width: 900px){
        .card {
            margin: 1.5 * $standard calc((100% - 30 * #{$standard}) / 4);
        }
    }

    @media screen and (max-width: 600px){
        .card {
            margin: 1.5 * $standard calc((100% - 15 * #{$standard}) / 2);
        }
    }

</style>
