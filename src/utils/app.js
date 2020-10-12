import cookie from "cookie_js";

export function setCode(value) {
    return cookie.set('code', value);
}

export function getCode() {
    return cookie.get('code');
}

export function removeCode() {
    return cookie.remove('code')
}

export function setRole(value) {
    return cookie.set('role', value);
}

export function getRole() {
    return cookie.get('role');
}

export function removeRole() {
    return cookie.remove('role')
}

