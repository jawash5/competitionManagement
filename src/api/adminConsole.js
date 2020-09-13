import service from "@/utils/request";

/**
 * 创建比赛
 */
export function creatCompetition(data) {
    return service.request({
        method: "put",
        url: '/competition/apply',
        data: data
    })
}
