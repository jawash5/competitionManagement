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
        url: '/groups/info?groupId=' + data,
    })
}

/**
 * 公告栏
 */
export function getBoard(data) {
    return service.request({
        method:"get",
        url: '/competition/board/' + data.competitionName + '?year=' + data.year,
    })
}

/**
 * 上传文件
 */
export function upload(data) {
    return service.request({
        method:"post",
        url: '/user/upload',
        data:data
    })
}

/**
 * 查看个人所有文件
 */
export function checkFiles() {
    return service.request({
        method:"get",
        url: '/user/files',
    })
}

/**
 * 个人删除文件
 */
export function deleteFiles(data) {
    return service.request({
        method:"delete",
        url: '/user/deletefile',
        data:data
    })
}

/**
 * 获取组文件列表
 */
export function getGroupFiles(data) {
    return service.request({
        method:"get",
        url: '/groups/files?groupId=' + data,
    })
}

/**
 * 邀请队友
 */
export function inviteMembers(data) {
    return service.request({
        method:"post",
        url: '/groups/invite',
        data:data
    })
}

/**
 * 同意组队邀请
 */
export function acceptInvitation(data) {
    return service.request({
        method:"post",
        url: '/groups/agree',
        data:data
    })
}

/**
 * 任命队长
 */
export function appointCaptain(data) {
    return service.request({
        method: "post",
        url: '/groups/captain',
        data: data
    })
}

/**
 * 删除队友
 */
export function deleteTeammate(data) {
    return service.request({
        method: "delete",
        url: '/groups/teammates',
        data: data
    })
}


/**
 * 删除队友
 */
export function tokenInfo(data) {
    return service.request({
        method: "post",
        url: '/groups/tokeninfo',
        data: data
    })
}

/**
 * 组的某一个阶段作品上交情况
 */
export function stageFile(data) {
    return service.request({
        method: "post",
        url: '/groups/filestatus',
        data: data
    })
}

/**
 * 文件单独下载
 */
export function userDownloadFile(data) {
    return service.request({
        method: "get",
        url: '/user/download',
        data: data
    })
}

/**
 * 个人删除文件
 */
export function userDeleteFile(data) {
    return service.request({
        method: "delete",
        url: '/user/deletefile',
        data: data
    })
}
