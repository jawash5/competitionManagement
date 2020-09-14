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
