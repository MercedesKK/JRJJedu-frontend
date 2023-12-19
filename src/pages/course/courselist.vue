<script  setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { Plus } from '@element-plus/icons-vue'
import { getCourse, createCourse, deleteCourse, updateCourse, getCourseType, getUserData } from '~/api/manager'


const tableData = ref([])
const roleData = ref([])

const udata = ref({})

const gdatau = () => {
    getUserData().then(res => {
        udata.value = res.data
    })
}
gdatau()
const pageInfo = reactive({
    page: 1,
    limit: 10,
    name: ''
})

// 分页数据
const total = ref(0)

// 模态框
const addFormDialog = ref(false)

function getData() {
    getCourse(pageInfo).then(res => {
        console.log(res, 'resrserse')
        tableData.value = res.data.list
        total.value = res.data.total
    })
}


getData()

function getRoleData() {
    getCourseType({}).then(res => {
        roleData.value = res.data.list
    })
}

getRoleData()


// 分页
function handleCurrentChange(value) {
    pageInfo.page = value
    getData()
}

// 添加表单部分
const refForm = ref(null)

const form = reactive({
    name: '',
    courseTypeId: '',
    graphicDetails: '',
    imgUrl: '',
    price: ''
})





const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    form.imgUrl = uploadFile.response.data
    console.log(uploadFile.response.data, 'form.imgUrl')
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        toast('Avatar picture size can not exceed 2MB!', "error")
        return false
    }
    return true
}



const handleAvatarSuccess2 = (
    response,
    uploadFile
) => {
    form.videoUrl = uploadFile.response.data
    console.log(uploadFile.response.data, 'form.fileUrl')
}

const beforeAvatarUpload2 = (rawFile) => {

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
    if (udata.value.status != 1) {
        toast("认证未通过，不能进行操作！", "error");
        return;
    }
    modalId.value = 0
    resetForm({
        name: '',
        courseTypeId: '',
        graphicDetails: '',
        imgUrl: '',
        price: ''
    })
    addFormDialog.value = true
}

// 修改
const handleEdit = (row) => {
    if (udata.value.status !== 1) {
        toast("认证未通过，不能进行操作！", "error");
        return;
    }
    modalId.value = row.id
    resetForm(row)
    addFormDialog.value = true
}

// 提交新增表单
function handleSubmit() {
    const fun = modalId.value ? updateCourse({ id: modalId.value, name: form.name, courseTypeId: form.courseTypeId, graphicDetails: form.graphicDetails, price: form.price, imgUrl: form.imgUrl }) : createCourse(form)

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
}




// 删除
const handleDelete = (id) => {
    if (udata.value.status !== 1) {
        toast("认证未通过，不能进行操作！", "error");
        return;
    }
    messageBox("确定要删除吗？").then(isres => {
        deleteCourse(id).then(res => {
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

// const yes = (data)=>{
//     updateVideo({id:data.id,status:1}).then(res=>{
//         getData()
//     })
// }
//
// const no = (data)=>{
//     updateVideo({id:data.id,status:0}).then(res=>{
//         getData()
//     })
// }

</script>

<template>
    <el-card shadow="never" class="border-0">

        <div class="mb-6 flex items-center">
            <el-input v-model="pageInfo.name" placeholder="请输入搜索内容" class="w-100 mr-2" />
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
            <el-table-column label="图片" align="center">
                <template #default="{ row }">
                    <div class="flex items-center justify-center">
                        <el-avatar :size="50" :src="row.imgUrl">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="">
                        </el-avatar>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="昵称" align="center"></el-table-column>

            <el-table-column prop="courseTypeName" label="分类" align="center"></el-table-column>
            <el-table-column prop="graphicDetails" label="简介" align="center"></el-table-column>

            <!--            <el-table-column prop="status" label="上架/下架" align="center">-->
            <!--                <template #default="scope">-->
            <!--                    <span>{{ scope.row.status == 1 ? '上架' : '下架' }}</span>-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column prop="price" label="价格" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center">
                <template #default="scope">
                    <span>{{ dateString(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" minWidth="200">
                <template #default="scope">
                    <!--                    <el-button type="primary" size="small" @click="yes(scope.row)" v-if="scope.row.status != 1 && udata.roleId == 0">上架</el-button>-->
                    <!--                    <el-button type="warning" size="small" @click="no(scope.row)" v-if="scope.row.status == 1 && udata.roleId == 0">下架</el-button>-->
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
        <el-dialog v-model="addFormDialog" :title="modalTitle" width="30%" :close-on-click-modal="false">

            <el-form :model="form" ref="refForm" label-width="80px">

                <el-form-item prop="name" label="昵称">
                    <el-input v-model="form.name" placeholder="昵称" />
                </el-form-item>

                <el-form-item prop="price" label="价格">
                    <el-input v-model="form.price" placeholder="价格" />
                </el-form-item>


                <el-form-item prop="graphicDetails" label="简介">
                    <textarea name="" id="" cols="30" rows="10" v-model="form.graphicDetails"></textarea>
                </el-form-item>



                <el-form-item prop="videoTypeId" label="分类">
                    <el-select v-model="form.courseTypeId" placeholder="分类">
                        <el-option v-for="item in roleData" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>




                <el-form-item prop="imgUrl" label="图片">
                    <el-upload class="avatar-uploader" :action="$elyasApi + '/file/uploadSingle'" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
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

.detailDss {
    width: 150px;
    height: 40px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>