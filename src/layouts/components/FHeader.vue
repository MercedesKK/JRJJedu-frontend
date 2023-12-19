<script setup>
import { ref, reactive } from 'vue'
import FromModal from '~/components/FromModal.vue'
import { messageBox, toast } from "~/composables/util"
import { logOut, getUserData } from '~/api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'



const router = useRouter()
const store = useStore()
console.log(store.state, 'user')
const udata = ref({})
const getUa = () => {
    getUserData().then(res => {
        if (res.code !== 200) {
            toast("token过期")
            store.dispatch("outlogin")

            // 跳转登录页
            router.push('/login')
        } else {
            udata.value = res.data
        }

    })
}
getUa()

console.log(udata.value, 'udata.value')

// 监听下拉菜单
const handleCommand = (c) => {
    console.log(c);
    switch (c) {
        case "outlogin":
            handleoutlogin()
            break;
        case "rePass":
            forrmModalRef.value.open()
            break;
    }
}

// 退出登录方法
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


// 手动刷新
const handleReFresh = () => location.reload()

// 模态框ref
const forrmModalRef = ref(null)

// 右侧弹出默认false
const showDrawer = ref(false)

// 提交数据表单
const form = reactive({
    oldPassword: '',
    password: '',
    rePassword: '',
})

// 验证规则
const rules = {
    oldPassword: [
        { required: true, message: '旧密码不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
    ],
    rePassword: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
    ]
}

// 获取ref节点
const refForForm = ref(null);


// 提交按钮
const onSubmit = () => {
    // 表单验证
    refForForm.value.validate((valid) => {
        if (!valid) {
            return false;
        } else {
            // loading.value = true
            console.log('提交了修改密码');
        }

    })
}
</script>


<template>
    <div class="f-huader flex bg-blue-500 text-indigo-50 fixed top-0 left-0 right-0 items-center ">
        <span class="logo justify-center items-center text-xl">
            <el-icon class="mr-1"><eleme-filled></eleme-filled></el-icon>
            渐入嘉靖教育平台
        </span>


        <el-icon class="icon-btn hover:bg-indigo-400" @click="handleReFresh">
            <refresh />
        </el-icon>

        <div class="ml-auto flex items-center ">

            <el-dropdown class="dropdown flex justify-center items-center mx-5" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="this.$store.state.user.avatar" />
                    {{ this.$store.state.user.userName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>

                        <el-dropdown-item command="outlogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>


    <!-- 修改密码框 -->
    <from-modal ref="forrmModalRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form :model="form" :rules="rules" ref="refForForm" label-width="100px">
            <el-form-item prop="oldPassword" label="旧密码">
                <el-input v-model="form.oldPassword" placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input v-model="form.password" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item prop="rePassword" label="确认新密码">
                <el-input v-model="form.rePassword" placeholder="请确认新密码" />
            </el-form-item>

        </el-form>
    </from-modal>
</template>

<style scoped>
.f-huader {
    height: 64px;

}

.f-huader .logo {
    width: 250px;
    text-align: center;

}

.icon-btn {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    cursor: pointer;
}

.f-huader .dropdown {
    height: 64px;
    cursor: pointer;
}
</style>