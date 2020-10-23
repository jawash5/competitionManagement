import service from "@/utils/request";


/**
 * 老师任务列表
 */
export function teacherTasks() {
    return service.request({
        method: "get",
        url: '/teacher/joined'
    })
}

/**
 * 老师打分小组信息
 */
export function teacherMarkGroup(data) {
    return service.request({
        method: "get",
        url: '/teacher/tasks?stageId=' + data,

    })
}

/**
 * 老师打分
 */
export function teacherMark(data) {
    return service.request({
        method: "post",
        url: '/teacher/mark',
        data
    })
}