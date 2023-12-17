import { createStore } from 'vuex'
import { login,getUserData } from '~/api/manager'
import { setToken,removetToken } from '~/composables/auth'
import { toast } from "~/composables/util"
const store = createStore({
    state(){
        return {
            // 用户信息
            user:{}
        }
    },
    mutations:{
        // 记录用户信息
        SET_USERINFO(state,user){
            state.user = user
        }
    },
    actions:{
        // 登录
        login({ commit }, { userName,password,roleId }){
            return new Promise((resolve,reject)=>{
                login(userName,password,roleId).then(res =>{
                    if (res.code !== 200) {
                        toast(res.message,"error")
                        return;
                    }
                    setToken(res.data.token)
                    resolve(res.data)
                }).catch(err=>reject(err))
            })
        },
        // 获取当前登录用户信息
        getinfo({ commit }){
           return new Promise((resolve,reject)=>{
                getUserData().then(res =>{
                    commit("SET_USERINFO",res.data)

                    resolve(res.data)
                }).catch(err=>reject(err))
           })
        },
        // 退出登录
        outlogin({ commit }) {
            removetToken()
            commit("SET_USERINFO",{})
        }
    }
})

export default store;