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

/**
 * 删除权限角色
 */
export function deleteRoles(data) {
    return service.request({
        method: "delete",
        url: '/manager/role/delete',
        data:data
    })
}

/**
 * 新增权限角色
 */
export function addRoles(data) {
    return service.request({
        method: "put",
        url: 'manager/role/add',
        data:data
    })
}

/**
 * 修改权限角色
 */
export function editRoles(data) {
    return service.request({
        method: "post",
        url: '/manager/role/modify',
        data:data
    })
}

/**
 * 增加公告
 */
export function addAnnouncement(data) {
    return service.request({
        method: "put",
        url: '/manager/board',
        data:data
    })
}

/**
 * 删除公告
 */
export function deleteAnnouncement(data) {
    return service.request({
        method: "delete",
        url: '/manager/board?boardId='+ data,
    })
}

/**
 * 公告置顶
 */
export function topAnnouncement(data) {
    return service.request({
        method: "post",
        url: '/manager/board/top?boardId='+ data,
    })
}
