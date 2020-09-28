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
 * 文件状态
 */
export function checkStatus(data) {
    return service.request({
        method:"post",
        url: '/competition/filestatus',
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