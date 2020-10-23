<template>
    <div class="scoringWork">
        <task-card v-for="task in taskList"
                   :key="task.id"
                   :info=task></task-card>
    </div>
</template>

<script>
    import taskCard from "@/views/teacher/component/taskCard";
    import {teacherTasks} from "@/api/teacher";

    export default {
        name: "scoringWork",
        components:{taskCard},
        data() {
            return {
                taskList:[]
            }
        },
        methods:{
            //获取老师任务列表
            getTasks() {
                teacherTasks().then( response => {
                    this.taskList = response.data.data;
                })
            }
        },
        mounted() {
            this.getTasks();
        }
    }
</script>

<style lang="scss" scoped>
    .scoringWork {
        display: flex;
        flex-wrap: wrap;
        min-width: 1000px;
    }


</style>