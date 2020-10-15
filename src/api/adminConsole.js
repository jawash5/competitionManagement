import service from "@/utils/request";

/**
 * 创建比赛
 */
export function createCompetition(data) {
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

/**
 * 显示该管理员维护的比赛列表
 */
export function getAdminCompetition() {
    return service.request({
        method: "get",
        url: '/manager/list'
    })
}

/**
 * 获取比赛组
 */
export function getCompetitionGroups(data) {
    return service.request({
        method: "get",
        url: '/manager/groups?year=' + data
    })
}

/**
 * 发送通知
 */
export function sendNotice(data) {
    return service.request({
        method: "post",
        url: '/manager/notice',
        data:data
    })
}

/**
 * 上传图片
 */
export function uploadPicture(data) {
    return service.request({
        method: "post",
        url: '/manager/picture',
        data:data
    })
}

/**
 * 删除图片
 */
export function deletePicture(data) {
    return service.request({
        method: "delete",
        url: '/manager/deletepicture',
        data:data
    })
}

/**
 * 获取比赛某阶段文件
 */
export function getStageFile(data) {
    return service.request({
        method: "get",
        url: '/competition/files?stage=' + data.stage + '&year=' + data.year,
    })
}

/**
 * 下载文件
 */
export function downloadFile(data) {
    return service.request({
        method: "post",
        url: '/manager/downloadall',
        data: data
    })
}

/**
 * 下载队伍信息
 */
export function downloadGroupInfo(data) {
    return service.request({
        method: "post",
        url: '/manager/excel',
        data: data,
        responseType: 'blob'
    })
}