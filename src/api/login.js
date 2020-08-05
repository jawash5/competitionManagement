import service from "@/utils/request";

export function login(data){
    service.request( {
        method:"post",
        url:'/auth/signin',
        data: data
    })
}