<script setup>

import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
const store = useStore()


const asideMenus = [
    {
        id: 0,
        name: '主页',
        con: 'location',
        frontpath: "/"
       
    },
    {
        id: 2,
        name: '系统管理',
        con: 'location',
        child: [
            {
                id: 0,
                name: '用户管理',
                frontpath: "/userlist"
            },
            {
                id: 1,
                name: '讲师管理',
                frontpath: "/tealist"
            },
            {
                id: 2,
                name: '角色管理',
                frontpath: "/role"
            },
        ]
    },
    {
        id: 3,
        name: '课程管理',
        con: 'location',
        child: [
            {
                id: 0,
                name: '课程列表',
                frontpath: "/courselist"
            },
            {
                id: 1,
                name: '课程目录列表',
                frontpath: "/coursetype"
            },
            {
                id: 2,
                name: '章节列表',
                frontpath: "/chapter"
            },
            {
                id: 3,
                name: '章节视频列表',
                frontpath: "/chaptervideo"
            },
        ]
    },
    {
        id: 5,
        name: '评论列表',
        con: 'location',
        child: [
            {
                id: 0,
                name: '评论列表',
                frontpath: "/commentmoment"
            }
        ]
    },



]

const teacherMenu = [
    {
        id: 0,
        name: '主页',
        con: 'location',
        frontpath: "/"
       
    },
    {
        id: 5,
        name: '课程管理',
        con: 'location',
        child: [
            {
                id: 0,
                name: '课程列表',
                frontpath: "/courselist"
            },
            {
                id: 1,
                name: '课程目录列表',
                frontpath: "/coursetype"
            },
            {
                id: 2,
                name: '章节列表',
                frontpath: "/chapter"
            },
            {
                id: 3,
                name: '章节视频列表',
                frontpath: "/chaptervideo"
            },
        ]
    },




]


// 选择菜单
const handleSelect = (e) => {
    console.log(e);
    router.push(e)
}


// 默认选中
const defaultActive = ref(route.path)


</script>


<template>
    <div class="f-menu fixed bg-light-50 shadow-2xl">
        <el-menu :default-active="defaultActive" class="border-0" @select="handleSelect">
            {{  store.user }}
            <template v-for="(item, i) in store.state.user.roleId == 0 ? asideMenus : teacherMenu" :key="i">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.id + ''">
                    <template #title>
                        <el-icon>
                            <el-icon>
                                <component :is="item.con"></component>
                            </el-icon>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath + ''">{{
                        item2.name
                    }}</el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.con"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>

        </el-menu>
    </div>
</template>



<style scoped>
.f-menu {
    width: 250px;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow: auto;
}
</style>