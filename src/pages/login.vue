<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '~/composables/util'
import { getRole } from '~/api/manager'


const router = useRouter()
const store = useStore()
const role = ref([])

// 提交数据表单
const form = reactive({
    userName: '',
    password: '',
    roleId: 0
})

function getUserRole() {
    getRole().then(res => {
        role.value = res.data.list
    })
}
getUserRole()

// 验证规则
const rules = {
    userName: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
}

// 获取ref节点
const refForForm = ref(null);
const loading = ref(false)

// 提交登录按钮
const onSubmit = () => {
    // 表单验证
    refForForm.value.validate((valid) => {
        if (!valid) {
            return false;
        } else {
            loading.value = true

            store.dispatch("login", form).then(res => {
                console.log(res, 'resrsersee')
                toast("登录成功")
                if (res.roleId == 1) {
                    router.push('/home')
                } else {
                    router.push('/')
                }



            }).finally(() => {
                loading.value = false
            })

        }

    })
}

// 监听回车事件
function onKeyUp(e) {
    console.log(e, 'keyup')
    if (e.key == "Enter") onSubmit()
}

// 添加键盘监听
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})

// 移除键盘事件
onBeforeMount(() => {
    document.removeEventListener("keyup", onKeyUp)
})

</script>


<template>
    <div class="bg-indigo-500 bigbox">

        <div class="boxs">
            <el-row>
                <el-col :span="16" class="leftbox bg-indigo-500 flex items-center justify-center">
                    <div class="p-20">
                        <div class="font-bold text-4xl text-light-50 mb-4">欢迎光临</div>
                        <div class=" text-gray-50 text-sm">渐入嘉靖教育平台，请输入账号密码进行登录本站！</div>
                    </div>
                </el-col>
                <el-col :span="8" class=" bg-light-50 flex items-center justify-center">
                    <div class="p-20">
                        <h2 class="text-3xl text-gray-800 font-bold flex items-center justify-center">欢迎回来</h2>
                        <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
                            <span class="h-[1px] w-16 bg-gray-200"></span>
                            <span>账号密码登录</span>
                            <span class="h-[1px] w-16 bg-gray-200"></span>
                        </div>
                        <el-form :model="form" class="w-[250px]" :rules="rules" ref="refForForm">
                            <el-form-item prop="userName">
                                <el-input v-model="form.userName" placeholder="请输入用户名" />
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password />
                            </el-form-item>
                            <div class="my-2 mb-2" style="font-size: 13px;cursor: pointer;"><router-link
                                    to="/register">没有账号？点我注册</router-link></div>

                            <div class="my-2 mb-2" style="font-size: 13px;cursor: pointer;"><router-link
                                    to="/back">找回密码</router-link></div>
                            <el-form-item>
                                <el-button color="#626aef" round class="w-[250px]" type="primary"
                                    @click="onSubmit">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<style scoped>
.leftbox {
    background: url(../assets/snow.jpg);
}

.boxs {
    /* margin: 200px auto; */
    width: 900px;
    border-radius: 15px;

}

.bigbox {
    margin: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>