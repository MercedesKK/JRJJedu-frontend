<script setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { getToken } from "~/composables/auth"
import { Plus } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { getVideo, getFa, getUserData, updateUser, getVideoType, logOut, deleteFa, getOr, deleteOr, updateOr } from '~/api/manager'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const route = useRoute()
const token = getToken()

const tabIndex = ref(0)
const tablist = ref([
    "资料",
    "收藏",
    "订单"
])

const selectTab = (u) => {
    tabIndex.value = u
}

const videos = ref([])
// const getV = () => {
//     getVideo({}).then(res => {
//         videos.value = res.data.list
//     })
// }
// getV()

// const myvideo = ref([])
// const getmyvideo = (tid) => {
//     getVideo({ videoTypeId: tid }).then(res => {
//         myvideo.value = res.data.list
//     })
// }
// getmyvideo()

// const typeIndex = ref(0)
//
// const typedata = ref([])
// const gettypedata = () => {
//     getVideoType({}).then(res => {
//         typedata.value = res.data.list
//         typedata.value.unshift({ name: '全部', id: '' })
//     })
// }
// gettypedata()
//
// const selectTypeIndex = (u, id) => {
//     typeIndex.value = u
//     getmyvideo(id)
// }

const collects = ref([])
const getCollect = () => {
    getFa({}).then(res => {
        collects.value = res.data.list
        console.log(collects.value)
    })

}
getCollect()

const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    form.avatar = uploadFile.response.data
    console.log(form.avatar, 'form.avatar')
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        toast('Avatar picture must be JPG format!', "error")
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        toast('Avatar picture size can not exceed 2MB!', "error")
        return false
    }
    return true
}

const form = reactive({
    userName: '',
    password: '',
    phone: '',
    email: '',
    avatar: '',
    id: ''
})


const getUsers = () => {
    getUserData().then(res => {
        form.userName = res.data.userName
        form.password = res.data.password
        form.phone = res.data.phone
        form.email = res.data.email
        form.avatar = res.data.avatar
        form.id = res.data.id

    })
}
getUsers()

const sbutton = () => {
    updateUser(form).then(res => {
        getUsers()
    })
}





const talkwindowlist = ref([])
const usersInfo = ref({})
const gettingUserData = () => {
    getUserData().then(res => {
        usersInfo.value = res.data
    })
}
gettingUserData()





const talksendlist = reactive({
    content: '',
    recipientId: 1692893558,
    senderId: usersInfo.value.id
})

const getArticleTypeData = () => {
    getChat({ recipientId: 1692893558 }).then(res => {
        talkwindowlist.value = res.data.list
    })
}
// getArticleTypeData()

const sends = () => {
    createChat(talksendlist).then(res => {
        getArticleTypeData()
        talksendlist.content = ''
    })
}

const GetTile = (time) => {
    var now = new Date(time)
    var nian = now.getFullYear()
    var yue = (now.getMonth() + 1).toString().padStart(2, '0')
    var ri = now.getDate().toString().padStart(2, '0')
    var shi = now.getHours().toString().padStart(2, '0')
    var fen = now.getMinutes().toString().padStart(2, '0')
    var miao = now.getSeconds().toString().padStart(2, '0')
    return `${nian}-${yue}-${ri} ${shi}:${fen}:${miao}`
}




function handleoutlogin() {
    messageBox("是否要退出登录？").then(res => {
        console.log("退出登录");
        logOut().finally(() => {

            store.dispatch("outlogin")

            // 跳转登录页
            router.push('/login')

            // 提示
            toast("退出登录成功")
        })
    })
}

const deleteCol = (id) => {
    deleteFa(id).then(res => {
        getCollect()
    })
}

const orders = ref([])

const getort = () => {
    getOr().then(res => {
        orders.value = res.data.list
    })
}
getort()

const delOR = (id) => {
    deleteOr(id).then(res => {
        getort()
    })
}


const toVideoDetaik = (id) => {
    router.push(`/detail?id=${id}`)
}


const toVideoDetaik2 = (id) => {
    router.push(`/detail2?id=${id}`)
}

const backbtns = (id) => {
    updateOr({ id: id, status: 3 }).then(res => {
        if (res.code !== 200) {
            toast(res.message, 'error')
            return;
        } else {
            toast('退款成功！')
            getort()
        }
    })
}

</script>

<template>
    <section class="">
        <div class="user">
            <div class="banner">
                <div class="info">
                    <img :src="store.state.user.avatar" alt="" />

                    <div class="left-info">
                        <div class="naame">{{ store.state.user.userName }}</div>
                        <div class="email">{{ store.state.user.email }}</div>
                    </div>
                </div>
            </div>

            <div class="container">
                <ul class="tabs">
                    <li :class="tabIndex == index ? 'tab active' : 'tab'" style="display: flex;align-items:center;"
                        v-for="(item, index) in tablist" :key="index" @click="selectTab(index)">
                        <i class="fas fa-house-damage" style="margin-right:5px;color:#00C091"></i>
                        <p>{{ item }}</p>
                    </li>

                </ul>

                <div class="content">
                    <section v-show="tabIndex == 0" class="active">
                        <div class="my-all-video">
                            <div class="title" id="pgsavenum">个人信息</div>
                            <el-card style="margin-left: 100px; padding: 0 100px;" shadow="always">
                                <el-form :model="form" ref="refForm" label-width="80px">
                                    <el-form-item prop="userName" label="用户名">
                                        <!--                                            <el-input v-model="form.userName" placeholder="请输入用户名" />-->
                                        {{ form.userName }}
                                    </el-form-item>

                                    <el-form-item prop="password" label="密码">
                                        <el-input v-model="form.password" placeholder="请输入密码" />
                                    </el-form-item>

                                    <el-form-item prop="email" label="邮箱">
                                        <el-input v-model="form.email" placeholder="请输入邮箱" />
                                    </el-form-item>

                                    <!--                                        <el-form-item prop="phone" label="手机号">-->
                                    <!--                                            <el-input v-model="form.phone" placeholder="请输入手机号" />-->
                                    <!--                                        </el-form-item>-->

                                    <el-form-item prop="avatar" label="头像">
                                        <el-upload class="avatar-uploader" :action="$elyasApi + '/file/uploadSingle'"
                                            :show-file-list="false" :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                                            <el-icon v-else class="avatar-uploader-icon">
                                                <Plus />
                                            </el-icon>
                                        </el-upload>
                                    </el-form-item>



                                </el-form>
                                <button class="gengxxin" onclick="reset()" type="button" @click="sbutton">更新</button>
                                <button class="gengxxin" @click="handleoutlogin" type="button">退出</button>
                            </el-card>
                        </div>
                    </section>


                    <section v-show="tabIndex == 1" class="active">
                        <div class="title" id="pgsavenum">我的收藏</div>
                        <div class="my-video-list" id="pageSave">
                            <div class="my-video-list" id="mySaveAll">
                                <el-card style="padding: 0 10px;" shadow="always">
                                    <div class="my-video-item" v-for="(element, index) in collects" :key="index">
                                        <img :src="element.imgUrl" alt="" @click="toVideoDetaik(element.momentId)">
                                        <div class="item-title">{{ element.courseName }}</div>
                                        <div class="icons-list">


                                            <div class="icons-item">
                                                <p>{{ dateString(element.createdAt) }}</p>
                                            </div>
                                        </div>
                                        <button style="background-color: #ff5000;color: #fff;padding: 4px 12px;"
                                            @click="deleteCol(element.id)">删除</button>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </section>

                    <section v-show="tabIndex == 2" class="active">
                        <div class="title" id="pgsavenum">购买的课程</div>
                        <div class="my-video-list" id="pageSave">
                            <div class="my-video-list" id="mySaveAll">
                                <div class="my-video-item" v-for="(element, index) in orders" :key="index">
                                    <el-card style="padding: 0 10px;" shadow="always">
                                        <img v-if="element.status === 0 || element.status === 3"
                                            :src="element.orderDetailsList[0].videoImgUrl" alt=""
                                            @click="toVideoDetaik(element.orderDetailsList[0].goodsId)">
                                        <img v-if="element.status === 1 || element.status === 2"
                                            :src="element.orderDetailsList[0].videoImgUrl" alt=""
                                            @click="toVideoDetaik2(element.orderDetailsList[0].goodsId)">
                                        <div class="item-title">{{ element.orderDetailsList[0].videoName }}</div>
                                        <div class="icons-item" style="font-size: 13px;margin-bottom: 5px;">
                                            <p>订单号:{{ element.id }}</p>
                                            <p>订单状态
                                            <p v-if="element.status === 0">待支付</p>
                                            <p v-if="element.status === 1">已完成</p>
                                            <p v-if="element.status === 2">售后中</p>
                                            <p v-if="element.status === 3">已退款</p>
                                            </p>
                                        </div>
                                        <div class="icons-list">


                                            <div class="icons-item">
                                                <p>{{ dateString(element.createdAt) }}</p>
                                            </div>
                                        </div>
                                        <button style="background-color: #ff5000;color: #fff;padding: 4px 12px;"
                                            @click="delOR(element.id)">删除</button>
                                        <button style="background-color: #ff9100;color: #fff;padding: 4px 12px;"
                                            @click="backbtns(element.id)" v-if="element.status === 2">退款</button>
                                    </el-card>
                                </div>

                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url(../../assets/css/custom.css);
@import url(../../assets/css/user.css);

.el-form-item {
    margin: 20px 0;
}

.tabcolo {
    background-color: #fff !important;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>