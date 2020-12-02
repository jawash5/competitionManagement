import service from "@/utils/request";

/**
 * 添加/删除tag
 */
export function editTag(data){
    return service.request({
        method: "post",
        url: '/supermanager/tag',
        data: data
    })
}

/**
 * 删除Banner
 */
export function deleteBanner(data){
    return service.request({
        method: "delete",
        url: '/supermanager/deletebanner',
        data: data
    })
}

/**
 * 新建Banner
 */
export function createBanner(data){
    return service.request({
        method: "post",
        url: '/supermanager/putbanner',
        data: data
    })
}