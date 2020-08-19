import service from "@/utils/request";

export function login(data){
    return service.request({
        method: "post",
        url: '/auth/signin',
        data: data
    })
}