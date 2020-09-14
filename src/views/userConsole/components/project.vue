<template>
    <div id="project">
        <div id="projectTop">
            <h3 id="projectName">{{ projectDetail.name }}</h3>
        </div>
        <el-divider></el-divider>
        <div id="projectBottom">
            <h5 id="founder">项目创始人：{{ projectDetail.captain.name }}</h5>
            <el-button type="primary" class="founderButton" @click="editMaterials">编辑资料</el-button>
            <el-button class="founderButton">删除项目</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project",
        data() {
            return {
            }
        },
        methods:{
            editMaterials:function () {
                this.$store.dispatch('group/setGroupId', this.projectDetail.id)
                this.$router.push({
                    path: "/editProject",
                });
            },
        },
        props:{
            projectDetail: {
                type:Object,
                require:true,
                default: () => {
                    return {
                        "id": -1,
                        "name": '',
                        "competition": {
                            "id": -1,
                            "information": "",
                            "year": "2019",
                            "startDate": "2019-01-01 00:00:00",
                            "endDate": "2019-01-01 00:00:00",
                            "signForm": {
                                "id": -1,
                                "maxPeople": 0,
                                "minPeople": 0,
                                "requireGroupName": false
                            },
                            "notice": [],
                            "nowStage": []
                        },
                        "teammates": [
                            {
                                "studentNo": -1,
                                "name": "",
                                "school": "",
                                "university": "",
                                "phoneNo": "",
                                "email": "",
                                "state": "",
                                "id": -1,
                                "password": "",
                                "username": "",
                                "roles": []
                            }
                        ],
                        "captain": {
                            "studentNo": -1,
                            "name": "",
                            "school": "",
                            "university": "",
                            "phoneNo": "",
                            "email": "",
                            "state": "",
                            "username": ""
                        },
                        "recordList": []
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    #project {
        margin: 10px 10px;
        width: 280px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 2px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    #project:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
    }

    #projectName{
        font-size: 20px;
        color: #409EFF;
        font-family: "幼圆" , serif;
    }

    #projectTop {
        margin-top: 20px;
        padding: 0 20px;
        text-align: center;
    }

    #projectBottom {
        height: 150px;
        margin: 0 40px 20px 40px;
        text-align: center;
    }

    #founder {
        font-size: 16px;
        color: #303133;
        font-weight: 500;
    }

    .founderButton {
        margin: 20px 0 0 0;
        display: block;
        width: 100%;
    }

</style>