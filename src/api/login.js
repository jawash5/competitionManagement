import service from "@/utils/request";

export function login(){
    service.request( {
        method:"post",
        url:'/user/12345',
        data:{}
    })
}