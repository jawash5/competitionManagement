//密码验证 数字+字母
export function validatePassword(data) {
    const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{11,20}$/
    return passwordReg.test(data)
}

//邮箱验证
export function validateEmail(data) {
    const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    return emailReg.test(data)
}

//手机验证
export function validatePhoneNo(data) {
    const phoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    return phoneReg.test(data)
}

//学号验证
export function validateStudentNumber(data) {
    const phoneReg = /^[1-2][0-9]{7}$/
    return phoneReg.test(data)
}