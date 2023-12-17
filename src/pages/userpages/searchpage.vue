<script setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { getToken } from "~/composables/auth"
import { Plus } from '@element-plus/icons-vue'
import { logOut } from '~/api/manager'
import { useRouter,useRoute  } from 'vue-router'
import { getCourseType,getCourse } from '~/api/manager'
import { useStore } from 'vuex'
const router =useRouter()
const store = useStore()
const route = useRoute()
const token = getToken()


const isId = router.currentRoute.value.query.id


const videos = ref([])

const getVideoData = (tid) => {
  getCourse({ page: 1, limit: 100,name:tid }).then(res => {
        videos.value = res.data.list
    })
}

getVideoData(isId)


const toVideoDetaik = (id)=>{
    router.push(`/detail?id=${id}`)
}

</script>

<template>

<section class="banxin">

<div class="main_video_all_list" style="margin-left: 20px">
    <ul class="all_video">
        <li class="video_item" v-for="(item,index) in videos" :key="index" @click="toVideoDetaik(item.id)">
        <a href="javascript:;">
          <div class="img">
            <img :src="item.imgUrl" alt="">
            <div class="toolbar">
              <div class="left">
                <span class="toolItem">
                  <i class="fas fa-play"></i>
                 {{ item.playNum }}
                </span><span class="toolItem">
                  <i class="far fa-comment-dots"></i>
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
</template>

<style scoped>
    @import url(../../assets/css/custom.css);
    @import url(../../assets/css/typeMain.css);
    
</style>