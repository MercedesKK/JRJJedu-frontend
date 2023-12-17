<script setup>
import { ref } from 'vue'

// 右侧弹出默认false
const showDrawer = ref(false)

const open = () =>showDrawer.value = true
const close = () =>showDrawer.value = false

// 提交
const emit = defineEmits(["submit"])
const submit = ()=>emit("submit")

// 向父组件暴露以下方法
defineExpose({
    open,
    close
})

const props = defineProps({
    title:String,
    size:{
        type:String,
        default:"45%"
    },
    destroyOnClose:{
        type:Boolean,
        default:false
    },
    confirmText:{
        type:String,
        default:'提交'
    }
})

</script>

<template>
    <el-drawer v-model="showDrawer" 
    :title="title" 
    :size="size" 
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
    >
        <div class="formDrawer flex flex-col">
           <div class="body">
                <slot></slot>
           </div>

           <div class="actions mt-auto flex items-center">
                <el-button class="" type="default" @click="close">取消</el-button>
                <el-button class="" type="primary" @click="submit">{{ confirmText }}</el-button>
           </div>
        </div>
    </el-drawer>
</template>



<style scoped>
    .formDrawer {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .formDrawer .body {
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }

    .formDrawer .actions {
        height: 50px;
    }

</style>
