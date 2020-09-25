// 引入路由和storage工具函数
import storage from '@/utils/storage'
import router from "@/router/index";
import { MessageBox } from "element-ui";
import {getCode, removeCode, removeRole, removeUsername} from "@/utils/app";
import { logout } from '@/api/login';

let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut = 1000  //设置超时时间: 60分钟

window.onload = function () {
    window.document.onmousedown = function () {
        storage.setItem("lastTime", new Date().getTime())
    }
};

function checkTimeout() {
    //检验登录状态
    if (getCode() === '0') {
        currentTime = new Date().getTime()		//更新当前时间
        lastTime = storage.getItem("lastTime");

        if (currentTime - lastTime > timeOut) { //判断是否超时
            // 清除storage的数据(登陆信息和token)
            storage.clear();

            // this.$store.dispatch('app/exit').then(() => {
            //     router.push({
            //         path:'/login'
            //     })
            // })
            removeRole();
            removeUsername();
            removeCode();
            // eslint-disable-next-line no-unused-vars
            logout().then(response => {
                return false
            })

            MessageBox.alert('登录已过期请重新登录', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
                // eslint-disable-next-line no-unused-vars
            }).then( response => {
                    // 跳到登陆页
                // eslint-disable-next-line no-unused-vars
                    router.push('/login').then(r => false)
            })
        }
    }
}

export default function () {
        /* 定时器 间隔30秒检测是否长时间未操作页面 */
        window.setInterval(checkTimeout, 1000);
}