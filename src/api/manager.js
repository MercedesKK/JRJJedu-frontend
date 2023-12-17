import axios from "~/axios";

// 登录方法
export function login(userName,password,roleId){
    return axios.post('/user/login',{
        userName,
        password,
        roleId
    })
}


// 公共
export function getUserData() {
    return axios.post('/user/detailByToken')
}

export function logOut() {
    return axios.post('/user/logout')
}

export function updatePassword(data) {
    return axios.post('/user/update',data)
}


// 用户管理
export function getUserList(data) {
    return axios.post("/user/findByModal",data)
}

export function createUser(data) {
    return axios.post("/user/add",data)
}

export function deleteUser(id) {
    return axios.post("/user/delete?id="+id)
}

export function updateUser(data) {
    return axios.post("/user/update",data)
}

export function upp(data) {
    return axios.post("/user/updatePassword",data)
}

// 角色

export function getRole(data) {
    return axios.post("/sys/role/findByModal",data)
}

export function createRole(data) {
    return axios.post("/sys/role/add",data)
}

export function deleteRole(id) {
    return axios.post("/sys/role/delete?id="+id)
}

export function updateRole(data) {
    return axios.post("/sys/role/update",data)
}





// 视频分类
export function getVideoType(data) {
    return axios.post("/video/type/findByModal",data)
}

export function createVideoType(data) {
    return axios.post("/video/type/add",data)
}

export function deleteVideoType(id) {
    return axios.post("/video/delete?id="+id)
}

export function updateVideoType(data) {
    return axios.post("/video/update",data)
}

export function detailVideoType(data) {
    return axios.post("/video/detail?id="+data)
}


// 视频
export function getVideo(data) {
    return axios.post("/video/findByModal",data)
}

export function createVideo(data) {
    return axios.post("/video/add",data)
}

export function deleteVideo(id) {
    return axios.post("/video/delete?id="+id)
}

export function updateVideo(data) {
    return axios.post("/video/update",data)
}

export function detailVideo(data) {
    return axios.post("/video/detail?id="+data)
}

export function getVideoRank(data) {
    return axios.post("/video/findRankByModal",data)
}


// 评论
export function getCommentMoment(data) {
    return axios.post("/moment/comment/findByModal",data)
}

export function createCommentMoment(data) {
    return axios.post("/moment/comment/add",data)
}

export function deleteCommentMoment(id) {
    return axios.post("/moment/comment/delete?id="+id)
}

export function updateCommentMoment(data) {
    return axios.post("/moment/comment/update",data)
}

export function detailCommentMoment(data) {
    return axios.post("/moment/comment/detail?id="+data)
}


// 合集
export function getCollection(data) {
    return axios.post("/collection/list/findByModal",data)
}

export function createCollection(data) {
    return axios.post("/collection/list/add",data)
}

export function deleteCollection(id) {
    return axios.post("/collection/list/delete?id="+id)
}

export function updateCollection(data) {
    return axios.post("/collection/list/update",data)
}

export function detailCollection(data) {
    return axios.post("/collection/list/detail?id="+data)
}


// 轮播图
export function getCover(data) {
    return axios.post("/cover/findByModal",data)
}

export function createCover(data) {
    return axios.post("/cover/add",data)
}

export function deleteCover(id) {
    return axios.post("/cover/delete?id="+id)
}




// 收藏夹
export function getFa(data) {
    return axios.post("/collect/findByModal",data)
}

export function createFa(data) {
    return axios.post("/collect/addOrCancel",data)
}

export function deleteFa(id) {
    return axios.post("/collect/delete?id="+id)
}

export function updateFa(data) {
    return axios.post("/collect/update",data)
}



// 订单
export function getOr(data) {
    return axios.post("/order/findByModal",data)
}

export function createOr(data) {
    return axios.post("/order/add",data)
}

export function deleteOr(id) {
    return axios.post("/order/delete?id="+id)
}

export function updateOr(data) {
    return axios.post("/order/updateGoods",data)
}


// 课程分类
export function getCourseType(data) {
    return axios.post("/course/type/findByModal",data)
}

export function createCourseType(data) {
    return axios.post("/course/type/add",data)
}

export function deleteCourseType(id) {
    return axios.post("/course/type/delete?id="+id)
}

export function updateCourseType(data) {
    return axios.post("/course/type/update",data)
}

export function detailCourseType(data) {
    return axios.post("/course/type/detail?id="+data)
}


// 课程列表
export function getCourse(data) {
    return axios.post("/course/findByModal",data)
}

export function createCourse(data) {
    return axios.post("/course/add",data)
}

export function deleteCourse(id) {
    return axios.post("/course/delete?id="+id)
}

export function updateCourse(data) {
    return axios.post("/course/update",data)
}

export function detailCourse(data) {
    return axios.post("/course/detail?id="+data)
}



// 课程章节
export function getChapter(data) {
    return axios.post("/course/chapter/findByModal",data)
}

export function createChapter(data) {
    return axios.post("/course/chapter/add",data)
}

export function deleteChapter(id) {
    return axios.post("/course/chapter/delete?id="+id)
}

export function updateChapter(data) {
    return axios.post("/course/chapter/update",data)
}

export function detailChapter(data) {
    return axios.post("/course/chapter/detail?id="+data)
}



// 章节视频
export function getChapterVideo(data) {
    return axios.post("/course/chapter/video/findByModal",data)
}

export function createChapterVideo(data) {
    return axios.post("/course/chapter/video/add",data)
}

export function deleteChapterVideo(id) {
    return axios.post("/course/chapter/video/delete?id="+id)
}

export function updateChapterVideo(data) {
    return axios.post("/course/chapter/video/update",data)
}

export function detailChapterVideo(data) {
    return axios.post("/course/chapter/video/detail?id="+data)
}


// 找回密码
export function getCode(data){
    return axios.post('/user/sendPasswordCode?phone='+data)
}