<script setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { getToken } from "~/composables/auth"
import { Plus } from '@element-plus/icons-vue'
import { logOut } from '~/api/manager'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const route = useRoute()
const token = getToken()

console.log(route.path, 'path')

const isPath = ref(false)

if (route.path == '/home') {
  isPath.value = true
} else {
  isPath.value = false
}

const toMine = () => {
  router.push(`/mine`)
}

// const inputvalue = ref('')
// const searchHandleClick = () => {
//   router.push(`/searchpage?id=${inputvalue.value}`)
// }


const toAdd = () => {
  router.push(`/addVideo`)
}

const toHome = () => {
  router.push(`/home`)
}

</script>

<template>
  <div>
    <header class="header">
      <nav id="navBar">
        <div class="menu" id="menu">
          <div class="left">
            <ul class="left_ul">
              <li class="left_li">
                <a href="javascript:;" @click="toHome">
                  <i class="fas fa-house-damage"></i>
                  首页
                </a>
              </li>

            </ul>
          </div>

          <!-- <div class="search">
            <input type="text" class="search_input" placeholder="请输入内容。。。" v-model="inputvalue" />
            <i class="fab fa-sistrix" @click="searchHandleClick"></i>
          </div> -->

          <div class="right">
            <ul class="right_ul">
              <li class="right_li avatar_box" id="noToken" v-if="!token">
                <a href="javascript:void(0);" style="width: 32px;height:42px;line-height: 42px;color: #fff;"
                  id="userAvatar" onclick="showLogin()">
                  登录
                </a>
              </li>
              <li class="right_li avatar_box" id="yesToken" v-else>
                <a href="javacript:;" style="width: 32px;height:32px" id="userAvatar">
                  <img :src="store.state.user.avatar" class="avatar" @click="toMine" />
                </a>
              </li>


              <!-- <a href="javascript:;">
                <button @click="toAdd"> 
                  <i class="fas fa-pen-square"></i>
                  投稿
                </button>
               </a> -->
            </ul>
          </div>
        </div>
        <!-- <img src="./images/logo.png" class="logo" id="logo"> -->
        <div class="logo" id="logo">
          <span class="title" @click="toHome">
            <a href="javascript:;">渐入嘉靖教育平台</a>
          </span>
        </div>
        <div>

        </div>
      </nav>

    </header>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/css/custom.css);
@import url(../../assets/css/header.css);

.title {
  font-size: 25px;
  color: #fff;
  font-weight: bolder;
  font-family: '华文中宋', 'STZhongsong', serif;
}
</style>