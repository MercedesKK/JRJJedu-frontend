<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';

</script>

<template>
   <el-container>
        <el-header class="shadow-xl" style="z-index: 99999;">
            <f-header></f-header>
        </el-header>
        
        <el-container>
            <el-aside>
                <f-menu></f-menu>
            </el-aside>

            <el-main>
                <!-- 主要内容 -->
                <router-view ></router-view>
            </el-main>
        </el-container>
   </el-container>
</template>