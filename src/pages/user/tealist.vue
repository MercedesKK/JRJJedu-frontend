<script  setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { Plus } from '@element-plus/icons-vue'
import { getUserList, createUser, deleteUser, updateUser, getRole,getUserData } from '~/api/manager'


const tableData = ref([])
const roleData = ref([])
const udata = ref({})

const gdatau = ()=>{
    getUserData().then(res=>{
        udata.value = res.data
    })
}
gdatau()

const pageInfo = reactive({
    page: 1,
    limit: 10,
    userName: '',
    roleId:2
})

// 分页数据
const total = ref(0)

// 模态框
const addFormDialog = ref(false)

function getData() {
    getUserList(pageInfo).then(res => {
        console.log(res, 'resrserse')
        tableData.value = res.data.list
        total.value = res.data.total
    })
}

function getRoleData() {
    getRole({}).then(res => {
        roleData.value = res.data.list
    })
}

getData()
getRoleData()

// 分页
function handleCurrentChange(value) {
    pageInfo.page = value
    getData()
}

// 添加表单部分
const refForm = ref(null)

const form = reactive({
    userName: '',
    password: '',
    phone: '',
    email: '',
    roleId: null,
    avatar: ''
})

const rules = {
    userName: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
    ],
}



const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    form.avatar = uploadFile.response.data
    console.log(form.avatar, 'form.avatar')
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        toast('Avatar picture must be JPG format!', "error")
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        toast('Avatar picture size can not exceed 2MB!', "error")
        return false
    }
    return true
}

// o 等于新增 等于当前id是修改
const modalId = ref(0)
const modalTitle = computed(() => modalId.value ? "修改" : "新增")

// 重置表单 数据回显
const resetForm = (row = false) => {
    if (refForm.value) refForm.value.clearValidate()
    if (row) {
        for (const key in form) {
            form[key] = row[key]
        }
    }
}

// 打开新增模态框
function openHandleCreateModal() {
    modalId.value = 0
    resetForm({
        userName: '',
        password: '',
        phone: '',
        email: '',
        roleId: '',
        avatar: '',
    })
    addFormDialog.value = true
}

// 修改
const handleEdit = (row) => {
    modalId.value = row.id
    resetForm(row)
    addFormDialog.value = true
}

// 提交新增表单
function handleSubmit() {
    refForm.value.validate((valid) => {
        if (!valid) return

        const fun = modalId.value ? updateUser({ id: modalId.value, userName: form.userName, password: form.password, phone: form.phone, email: form.email, roleId: form.roleId, avatar: form.avatar }) : createUser(form)

        fun.then(res => {
            if (res.code !== 200) {
                toast(res.message, "error");
                return;
            } else {
                toast(modalTitle.value + '成功!')
                getData()
                refForm.value.resetFields()
                addFormDialog.value = false
            }

        })

    })
}



 




// 删除
const handleDelete = (id) => {
    messageBox("确定要删除吗？").then(isres => {
        deleteUser(id).then(res => {
            if (res.code !== 200) {
                toast(res.message, "error");
                return;
            } else {
                toast('删除成功!')
                getData()
            }
        })
    })
}

const yes = (data)=>{
    updateUser({id:data.id,status:1}).then(res=>{
        getData()
    })
}

const no = (data)=>{
    updateUser({id:data.id,status:2}).then(res=>{
        getData()
    })
}

const backs = (data)=>{
    updateUser({id:data.id,status:0}).then(res=>{
        getData()
    })
}

</script>

<template>
    <el-card shadow="never" class="border-0">

        <div class="mb-6 flex items-center">
            <el-input v-model="pageInfo.userName" placeholder="请输入搜索内容" class="w-100 mr-2" />
            <el-button type="primary" @click="getData">
                搜索
            </el-button>
        </div>


        <!-- 新增 刷新 -->
        <div class="flex items-center justify-between mb4">
            <el-button type="primary" size="middle" @click="openHandleCreateModal">新增</el-button>
            <el-button text>
                <el-icon :size="20" @click="getData">
                    <Refresh></Refresh>
                </el-icon>
            </el-button>
        </div>


        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id" align="center"></el-table-column>
            <el-table-column label="头像" align="center">
                <template #default="{ row }">
                    <div class="flex items-center justify-center">
                        <el-avatar :size="50" :src="row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="">
                        </el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
            <el-table-column label="所属权限" align="center">
                <template #default="{ row }">
                    <div class="">
                        {{ { "0": "管理员", "1": "用户", "2": "讲师" }[row.roleId] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="认证状态" align="center">
                <template #default="{ row }">
                    <div class="">
                        {{ { "0": "待认证", "1": "已认证", "2": "认证不通过" }[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center">
                <template #default="scope">
                    <span>{{ dateString(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" minWidth="300">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="yes(scope.row)" v-if="scope.row.status == 0 ">认证通过</el-button>
                    <el-button type="warning" size="small" @click="no(scope.row)" v-if="scope.row.status == 0 ">认证不通过</el-button>
                    <el-button type="warning" size="small" @click="backs(scope.row)" v-if="scope.row.status != 0 ">撤销认证</el-button>
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager,next,total" :total="total" :current-page="pageInfo.page"
                :page-size="pageInfo.limit" @current-change="handleCurrentChange" />
        </div>


        <!-- 模态框 -->
        <el-dialog v-model="addFormDialog" :title="modalTitle" width="30%" 
            :close-on-click-modal="false">

            <el-form :model="form" :rules="rules" ref="refForm" label-width="80px">

                <el-form-item prop="userName" label="用户名">
                    <el-input v-model="form.userName" placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password" placeholder="请输入密码" />
                </el-form-item>

                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>

                <el-form-item prop="phone" label="手机号">
                    <el-input v-model="form.phone" placeholder="请输入手机号" />
                </el-form-item>

                <el-form-item prop="avatar" label="头像">
                    <el-upload class="avatar-uploader" :action="$elyasApi+'/file/uploadSingle'"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

                <el-form-item prop="roleId" label="选择权限">
                    <el-select v-model="form.roleId" placeholder="请选择权限">
                        <el-option v-for="item in roleData" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addFormDialog = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>



    </el-card>
</template>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>