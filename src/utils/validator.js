//密码验证 数字+字母
export function validatePassword(data) {
    const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{11,}$/
    return passwordReg.test(data)
}

//邮箱验证
export function validateEmail(data) {
    const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    return emailReg.test(data)
}

//手机验证
export function validatePhoneNo(data) {
    const phoneReg = /^1[3456789]\d{9}$/
    return phoneReg.test(data)
}

//学号验证
export function validateStudentNumber(data) {
    const phoneReg = /^[1-2][0-9]{7}$/
    return phoneReg.test(data)
}