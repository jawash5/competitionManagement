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