import service from "@/utils/request";

/**
 * 活动报名
 */
export function applyCompetition(data){
    return service.request({
        method: "put",
        url: '/competition/apply',
        data: data
    })
}

/**
 * 查看所在组
 */
export function checkGroup(){
    return service.request({
        method: "get",
        url: '/user/groups',
    })
}

/**
 * 查看个人信息
 */
export function personalInfo() {
    return service.request({
        method:"get",
        url: '/user/info',
    })
}

/**
 * 修改个人信息
 */
export function modifyPersonalInfo(data) {
    return service.request({
        method:"post",
        url: '/user/modify',
        data:data
    })
}

/**
 * 查看组信息
 */
export function getGroupInfo(data) {
    return service.request({
        method:"get",
        url: 'groups/info?groupId=' + data,
    })
}