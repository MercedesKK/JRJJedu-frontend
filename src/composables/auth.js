import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "admin-token"
const cookie = useCookies()

// 设置token
export function setToken(token) {
    return cookie.set(TokenKey,token)
}
// 获取token
export function getToken() {
    return cookie.get(TokenKey)
}
// 清除token
export function removetToken() {
    return cookie.remove(TokenKey)
}