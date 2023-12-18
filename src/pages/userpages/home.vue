<script setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { Plus } from '@element-plus/icons-vue'
import { } from '~/api/manager'
import { useRouter } from 'vue-router'
import { getCourseType, getCourse,getVideo } from '~/api/manager'
const router = useRouter()

const videotype = ref([])
const videoRank = ref([])
const videos = ref([])


const getVideoTypeData = () => {
    getCourseType({ page: 1, limit: 999 }).then(res => {
        videotype.value = res.data.list
        videotype.value.unshift({name:'全部',id:''})
    })

   
}

getVideoTypeData()


const getRank = () => {
    getCourse({ page: 1, limit: 6 }).then(res => {
        videoRank.value = res.data.list
    })
}

getRank()


const getVideoData = () => {
    getCourse({ page: 1, limit: 100 }).then(res => {
        videos.value = res.data.list
    })
}

getVideoData()




const reget = () => {
    getRank()
}


// const navBar = document.querySelector('#menu');
// window.addEventListener('scroll', function () {
//     console.log(scrollY, 'scrollTop')
//     if (scrollY >= 65) {
//         navBar.classList.add('sticky')
//     } else {
//         navBar.classList.remove('sticky')
//     }
// })


const toVideoDetaik = (id)=>{
    router.push(`/detail?id=${id}`)
}

const selectTyped = (id)=>{
    router.push(`/search?id=${id}`)
}


</script>

<template>
    <div>
        <section class="banxin">
            <div class="main_top">
                
                <div class="middle" style="display: flex;align-items: center;">
                    <div style="font-size: 20px;font-weight: 700;margin-right: 10px;">授课阶段：</div>
                    <ul class="middle_types">
                        <li class="type_item" v-for="(item, index) in videotype" :key="index" @click="selectTyped(item.id)">{{ item.name }}</li>
                    </ul>
                </div>
                
            </div>

            <div class="main_middle">
                <div class="middle_left">
                    <el-carousel height="450px">
                        <el-carousel-item v-for="item in videoRank" :key="item">
                            <img :src="item.imgUrl" alt="" @click="toVideoDetaik(item.id)">
                        </el-carousel-item>
                    </el-carousel>
                </div>

                <div class="middle_right">
                    <ul class="video_random">
                        <li class="random_item" v-for="(item, index) in videoRank" :key="index" @click="toVideoDetaik(item.id)">
                            <a href="javascript:;">
                                <div class="img">
                                    <img :src="item.imgUrl" alt="">
                                    <div class="toolbar">
                                        <div class="left">
                                            <span class="toolItem">
                                                <el-icon size="20" color="#fff">
                                                    <View />
                                                    </el-icon>
                                                {{ item.playNum }}
                                            </span><span class="toolItem">
                                                <el-icon size="20" color="#fff">
                                                    <ChatLineRound />
                                                    </el-icon>
                                                {{ item.momentCommentNum }}
                                            </span>
                                        </div>

                                        <div class="right">
                                            <span class="toolItem">


                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span class="title">{{ item.name }}</span>
                                <span class="video_info">
                                    <p class="userName">{{ item.userName }}</p>
                                    <p class="createdTimee">{{ dateString(item.createdAt) }}</p>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="middle_reGetData_button" id="resetBtn" @click="reget">
                    <i class="fas fa-chess-rook"></i>
                    <i>换</i>
                    <i>一</i>
                    <i>换</i>
                </div>
            </div>

            <div class="main_video_all_list">
                <ul class="all_video">
                    <li class="video_item" v-for="item in videos" :key="item.id" @click="toVideoDetaik(item.id)">
                        <a href="javascript:;">
                            <div class="img">
                                <img :src="item.imgUrl" alt="">
                                <div class="toolbar">
                                    <div class="left">
                                        <span class="toolItem">
                                                <el-icon size="20" color="#fff">
                                                    <View />
                                                    </el-icon>
                                                {{ item.playNum }}
                                            </span><span class="toolItem">
                                                <el-icon size="20" color="#fff">
                                                    <ChatLineRound />
                                                    </el-icon>
                                                {{ item.momentCommentNum }}
                                            </span>
                                    </div>

                                    <div class="right">
                                        <span class="toolItem">

                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span class="title">{{ item.name }}</span>
                            <span class="video_info">
                                <p class="userName">{{ item.userName }}</p>
                                <p class="createdTimee">{{ dateString(item.createdAt) }}</p>
                            </span>
                        </a>
                    </li>


                </ul>
            </div>

        </section>
    </div>
</template>

<style scoped>
@import url(../../assets/css/custom.css);
@import url(../../assets/css/main.css);
</style>