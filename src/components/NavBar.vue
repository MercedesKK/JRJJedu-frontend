<template>
  <el-menu class="navBar" :default-active="activeIndex" mode="horizontal" :ellipsis="false" background-color="#fefefe06"
    @select="handleSelect">
    <el-menu-item index="home" class="logo">
      <img src="../assets/logo/logo.png" alt="JRJJ Logo">
      <img src="../assets/logo/logo2.png" alt="JRJJ Logo">
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="2" v-if="token">
      <template #title>
        <div class="demo-fit">
          <el-avatar shape="square" :size="60" :fit="fit" :src="store.state.user.avatar" />
          <el-text tag="b" style="margin-left: 10px">{{ store.state.user.userName }}</el-text>
        </div>
      </template>
      <el-menu-item :index="'2-1'" v-if="store.state.user.userName">个人中心</el-menu-item>
      <el-menu-item :index="'2-2'" v-if="store.state.user.userName">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>


<script setup>
import { ElMenu, ElMenuItem } from 'element-plus'
import router from '~/router'
import { getToken } from "~/composables/auth"
import { useStore } from 'vuex'
import { toast, messageBox } from "~/composables/util"
import { logOut } from '~/api/manager'

const token = getToken()
const store = useStore()

const handleSelect = (key, keyPath) => {
  keyPath; // 用不到但是要写
  if (key === 'home') {
    router.push('/home');
  }
  else if (key === '2-1') {
    router.push('/mine');
  }
  else if (key === '2-2') {
    handleoutlogin();
  }
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
</script>

<style scoped>
.navBar {
  display: flex;
  width: 100%;
  height: 100px;
  background: url('/src/assets/logo/blue.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  /* background: linear-gradient(to right, rgb(209, 190, 247), #f1cfeb); */
}

.flex-grow {
  flex-grow: 1;
}

.logo {
  width: 20%;
  height: 90%;
}

.logo img {
  max-width: 100%;
  max-height: 100%;
  width: 50%;
}
</style>
