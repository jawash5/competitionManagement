import service from "@/utils/request";

/**
 * 创建比赛
 */
export function creatCompetition(data) {
    return service.request({
        method: "put",
        url: '/manager/create',
        data: data
    })
}

/**
 * 获取角色信息
 */
export function getRoles() {
    return service.request({
        method: "get",
        url: '/manager/role',
    })
}