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
        url: '/competition/files?stageId=' + data,
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
 * 文件状态
 */
export function checkStatus(data) {
    return service.request({
        method:"post",
        url: '/manager/filestatus',
        data:data
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

/**
 *  淘汰队伍
 */
export function outTeam(data) {
    return service.request({
        method: "post",
        url: '/manager/group/out',
        data: data,
    })
}

/**
 * 获取教师名和教师工号
 */
export function getTeachersInfo(data) {
    return service.request({
        method: "get",
        url: '/manager/teachers?staffId='+data.staffId+'&teacherName='+data.teacherName,
    })
}

/**
 * 文件关联/取消关联评委
 */
export function toggleRelated(data) {
    return service.request({
        method: "post",
        url: '/manager/teacher',
        data:data,
    })
}

/**
 * 比赛关联/取消关联评委
 */
export function relatedTeacher(getData) {
    return service.request({
        method: "post",
        url: '/manager/getTeacher',
        data:getData,
    })
}

/**
 * 某年的比赛Id
 */
export function yearCompetitionId(data) {
    return service.request({
        method: "get",
        url: '/manager/name?year=' + data,
    })
}

/**
 * 显示组的类别
 */
export function showType(data) {
    return service.request({
        method: "post",
        url: '/competition/commerce/group/type',
        data:data
    })
}

/**
 * 获取某个比赛的评委老师列表
 */
export function showTeacher(data) {
    return service.request({
        method: "get",
        url: '/manager/competition/teacher?competitionId=' + data,
    })
}

/**
 * 比赛基本信息修改
 */
export function editBasicInfo(data) {
    return service.request({
        method: "post",
        url: '/manager/modify/common',
        data:data
    })
}

/**
 * 比赛介绍信息修改
 */
export function editDescInfo(data) {
    return service.request({
        method: "post",
        url: '/manager/modify/description',
        data:data
    })
}
