<script  setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { getRole, createRole, deleteRole, updateRole } from '~/api/manager'


const tableData = ref([])



const pageInfo = reactive({
    page: 1,
    limit: 10,
    roleName: ''
})

// 分页数据
const total = ref(0)

// 模态框
const addFormDialog = ref(false)

function getData() {
    getRole(pageInfo).then(res => {
        console.log(res, 'resrserse')
        tableData.value = res.data.list
        total.value = res.data.total
    })
}

getData()


// 分页
function handleCurrentChange(value) {
    pageInfo.page = value
    getData()
}

// 添加表单部分
const refForm = ref(null)

const form = reactive({
    roleName: '',
    
})

const rules = {
    roleName: [
        { required: true, message: '名称不能为空', trigger: 'blur' },
    ],
   
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
        roleName: '',
       
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

        const fun = modalId.value ? updateRole({ id: modalId.value, roleName: form.roleName }) : createRole(form)

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
        deleteRole(id).then(res => {
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



</script>

<template>
    <el-card shadow="never" class="border-0">

        <div class="mb-6 flex items-center">
            <el-input v-model="pageInfo.roleName" placeholder="请输入搜索内容" class="w-100 mr-2" />
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
            
            <el-table-column prop="roleName" label="名称" align="center"></el-table-column>
            
            <el-table-column label="创建时间" align="center">
                <template #default="scope">
                    <span>{{ dateString(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
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

                <el-form-item prop="roleName" label="名称">
                    <el-input v-model="form.roleName" placeholder="名称" />
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

</style>