<script setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { Plus } from '@element-plus/icons-vue'
import { } from '~/api/manager'
import { useRouter } from 'vue-router'
import { getCourseType, getCourse, getVideo } from '~/api/manager'
const router = useRouter()

const videotype = ref([])
const videoRank = ref([])
const videos = ref([])


const getVideoTypeData = () => {
    getCourseType({ page: 1, limit: 999 }).then(res => {
        videotype.value = res.data.list
        videotype.value.unshift({ name: '全部', id: '' })
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

const toVideoDetaik = (id) => {
    router.push(`/detail?id=${id}`)
}

const selectTyped = (id) => {
    router.push(`/search?id=${id}`)
}


</script>

<template>
    <div class="container">
        <section class="banxin" style="margin-top: 20px">
            <!-- 链接区 -->
            <div class="top">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-card height="450x" shadow="always">
                            <div class="left">
                                <el-button key="plain" type="" link>
                                    <img src="../../../src/assets/images/douyin-removebg-preview.png"
                                        style="width: 40px; margin-right: 5px;">
                                    <a href="https://www.douyin.com/user/MS4wLjABAAAABRagcWJfw-FP_COPcH_pD72dY43Xw4-uDHnqXf7NauCvjipgx2_qnGqBZ_CSOI0B"
                                        target="_blank">嘉靖学长-只讲干货</a>
                                </el-button>
                                <el-button key="plain" type="" link>
                                    <img src="../../../src/assets/images/kuaishou.png"
                                        style="width: 80px; margin-right: 5px;">
                                    <a href="https://www.kuaishou.com/profile/3xcchs5z8gfdfpm" target="_blank">嘉靖学长-只讲干货</a>
                                </el-button>
                                <el-button key="plain" type="" link>
                                    <img src="../../../src/assets/images/xiaohongshu.png"
                                        style="width: 80px; margin-right: 5px;">
                                    <a href="https://www.xiaohongshu.com/user/profile/6257d67300000000210268fa"
                                        target="_blank">嘉靖学长-只讲干货</a>
                                </el-button>
                                <el-button key="plain" type="" link>
                                    <img src="../../../src/assets/images/blbl.png" style="width: 80px; margin-right: 5px;">
                                    <a href="https://space.bilibili.com/694007308?spm_id_from=333.337.search-card.all.click"
                                        target="_blank">嘉靖学长-只讲干货</a>
                                </el-button>
                                <img src="/src/assets/logo/1.jpg" alt="" style="height: 250px;">
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="16">
                        <!--轮播图-->
                        <el-card height="400px" shadow="always">
                            <el-carousel :interval="5000" arrow="hover" indicator-position="outside" height="400px">
                                <el-carousel-item v-for="item in videoRank" :key="item">
                                    <img :src="item.imgUrl" alt="" @click="toVideoDetaik(item.id)"
                                        style="width: 100%; height: 100%;">
                                </el-carousel-item>
                            </el-carousel>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <!-- 分类栏 -->
            <div class="main_top">

                <div class="middle" style="display: flex;align-items: center;">
                    <div style="font-size: 20px;font-weight: 700;margin-right: 10px;">授课阶段：</div>
                    <ul class="middle_types">
                        <li class="type_item" v-for="(item, index) in videotype" :key="index" @click="selectTyped(item.id)">
                            {{ item.name }}</li>
                    </ul>
                </div>
            </div>
            <!-- 课程列表 -->
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

.top {
    width: 100%;
    height: 500px;
    margin-top: 10px;
}

.top .left {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>