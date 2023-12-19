<script setup>
import { ref } from 'vue'
import { getToken } from "~/composables/auth"
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from "~/components/NavBar.vue"

const router = useRouter()
const store = useStore()
const route = useRoute()
const token = getToken()

const isPath = ref(false)

if (route.path == '/home') {
  isPath.value = true
} else {
  isPath.value = false
}

</script>

<template>
  <div>
    <NavBar></NavBar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
/* @import url(../../assets/css/custom.css);
@import url(../../assets/css/header.css); */
.main {
  margin: 0 100px;
}

/* .title {
  font-size: 25px;
  color: #fff;
  font-weight: bolder;
  font-family: '华文中宋', 'STZhongsong', serif;
} */
</style>