<script setup>
import { ref, reactive, computed } from 'vue'
import { toast, dateString, messageBox } from "~/composables/util"
import { Plus } from '@element-plus/icons-vue'
import {updateOr} from '~/api/manager'
import { useRouter } from 'vue-router'
import { detailCourse, getCourse, createCommentMoment, createFa, createOr } from '~/api/manager'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()


const detailData = ref({})
const videos = ref([])
const isId = router.currentRoute.value.query.id
const playUrls = ref('')
const leindexList = ref([]);
const getDetail = (ids) => {
    detailCourse(ids).then(res => {
        detailData.value = res.data
      console.log(res.data)
        playUrls.value = res.data.courseChapterList[0].courseChapterVideoList[0].videoUrl
        // 定义一个数组来存储每个el-collapse-item的索引值

        // 在获取到数据后，初始化leindexList
        // 假设detailData.courseChapterList为获取的数据
        if (res.data.courseChapterList) {
            for (let i = 0; i < res.data.courseChapterList.length; i++) {
                leindexList.value.push(0);  // 初始化每个el-collapse-item的索引值为0
            }
        }
    })
}

getDetail(isId)






const changevideoSrc = (url, i) => {
    if (leindexList.value && leindexList.value.length > 0) {
        for (let j = 0; j < leindexList.value.length; j++) {
            if (j === i) {
                leindexList.value[j] = i;  // 更新对应的el-collapse-item的索引值为i
            } else {
                leindexList.value[j] = i;  // 其他项的索引值设为-1，表示未选中状态
            }
        }
        playUrls.value = url;
    }
}




const getVideoR = () => {
    getCourse().then(res => {
        videos.value = res.data.list
    })
}

getVideoR()

const form = reactive({
    momentId: isId,
    comment: ''
})

const sendCom = () => {
    createCommentMoment(form).then(res => {
        form.comment = ''
        getDetail(isId)
    })
}

const toVideoDetaik = (id) => {
    setTimeout(() => {
        router.push(`/detail?id=${id}`)
    }, 200);
}

// const navBar = document.querySelector('#menu');
// window.addEventListener('scroll', function () {
//     console.log(scrollY, 'scrollTop')
//     if (scrollY >= 65) {
//         navBar.classList.add('sticky')
//     } else {
//         navBar.classList.remove('sticky')
//     }
// })

const isPlay = ref(false)


const toChat = () => {
    router.push(`/chat?id=${detailData.value.createdBy}`)
}


const save = () => {
    createFa({ momentId: isId, status: 1 }).then(res => {
        if (res.code !== 200) {
            toast(res.message, 'error')
            return;
        } else {
            toast('收藏成功！')
            getDetail(isId)
        }

    })
}

// const toOr = () => {
//     createOr(
//         {
//             totalMoney: detailData.value.price ? detailData.value.price : 1,
//             orderDetailsList: [{
//                 goodsId: detailData.value.id,
//                 price: detailData.value.price ? detailData.value.price : 1,
//                 num: 1
//             }]
//         }
//     ).then(res => {
//         if (res.code !== 200) {
//             toast(res.message, 'error')
//             return;
//         } else {
//             messageBox("确认购买").then(isres => {
//                 updateOr({id:detailData.value.id,status:1}).then(res=>{
//                     if (res.code !== 200) {
//                         toast(res.message,'error')
//                         return;
//                     } else {
//                         toast('购买成功！即将跳转支付页面...')
//
//                         setTimeout(() => {
//                             router.push('/detail2?id=' + isId)
//                             const div = document.createElement('divform');
//                             div.innerHTML = res.data;
//                             document.body.appendChild(div);
//                             document.forms['punchout_form'].setAttribute('target', '_blank')
//                             document.forms['punchout_form'].submit()
//
//
//                         }, 1000);
//                     }
//                 })
//             }).catch(resp => {
//
//                 router.push("/mine")
//             })
//             // getDetail(isId)
//         }
//     })
// }

const toOr = () => {
    messageBox("确认购买")
        .then(isres => {
            createOr(
                {
                    totalMoney: detailData.value.price ? detailData.value.price : 1,
                    orderDetailsList: [{
                        goodsId: detailData.value.id,
                        price: detailData.value.price ? detailData.value.price : 1,
                        num: 1
                    }],
                    status: 1,
                })
                .then(resp => {
                    toast('购买成功！即将跳转支付页面...')

                    setTimeout(() => {
                        router.push('/detail2?id=' + isId)
                        const div = document.createElement('divform');
                        div.innerHTML = res.data;
                        document.body.appendChild(div);
                        document.forms['punchout_form'].setAttribute('target', '_blank')
                        document.forms['punchout_form'].submit()


                    }, 1000);
                })
    })
        .catch(resp => { // 不买了
            createOr(
                {
                    totalMoney: detailData.value.price ? detailData.value.price : 1,
                    orderDetailsList: [{
                        goodsId: detailData.value.id,
                        price: detailData.value.price ? detailData.value.price : 1,
                        num: 1
                    }],
                    status: 0,
                })
                .then(resp => {
                    toast('请及时支付~')
                })
        })
}

</script>

<template>
    <div>
        <section class="banxin" style="margin-top: 20px;">
            <div class="detail-wrapper">
                <div class="left">
                    <div class="video-wrapper">
                        <h1 id="name">
                            {{ detailData.name }}
                        </h1>
                        <div class="info">
                            <span class="info-item">
                                <el-icon size="20" color="#666">
                                    <View />
                                </el-icon>
                                <p class="playnumber">{{ detailData.playNum }}</p>
                            </span>
                            <span class="info-item">
                                <el-icon size="20" color="#666">
                                    <ChatLineRound />
                                </el-icon>
                                <p id="comNum">{{ detailData.momentCommentNum }}</p>
                            </span>
                            <span class="info-item" id="times">{{ dateString(detailData.createdAt) }}</span>
                        </div>
                        <div class="videowindow" style="position: relative;">
                            <video :src="detailData.videoUrl" :controls="isPlay"></video>
                            <div class="ram" v-show="!isPlay">请购买之后再观看该课程！</div>
                        </div>
                        <div class="contentt" style="margin: 15px 0;" v-html="detailData.graphicDetails">

                        </div>
                        <button class="sendBtn" id="commentBtn" style="cursor: pointer;margin-right: 10px;"
                            @click="save">收藏</button>
                        <button class="sendBtn" id="commentBtn" style="cursor: pointer;background-color: rgb(255, 140, 82);"
                            @click="toOr">购买课程</button>
                        <span style="margin-left: 20px;font-size: 22px;font-weight: 700;color: #ff8000;">￥{{
                            detailData.price ? detailData.price : 1 }}</span>
                        <a href="https://work.weixin.qq.com/kfid/kfc76a1c0ddfb28ed47" target="_blank">
                            <img
                                src="../../assets/images/lianxikefu.png"
                                alt="联系客服"
                                style="width: 15%; margin: 20px;"
                            >
                        </a>
                    </div>

                    <div class="comment-wrapper">
                        <div class="comment-title">
                            评论
                            <p class="comNum">{{ detailData.momentCommentNum }}</p>
                        </div>
                        <div class="comment-input">
                            <div class="userinfo">
                                <img :src="store.state.user.avatar" alt="" />
                                <textarea name="" id="comment_input" cols="30" rows="10" v-model="form.comment"></textarea>
                                <button class="sendBtn" id="commentBtn" style="cursor: pointer;"
                                    @click="sendCom">发布</button>
                            </div>
                        </div>
                        <div class="comment-list">
                            <div class="comment-item" v-for="(item, idnex) in detailData.momentCommentList">
                                <img :src="item.avatar
                                    " alt="" />
                                <div class="comment-box">
                                    <h4 class="userName">{{ item.userName }}</h4>
                                    <p class="comment">
                                        {{ item.comment }}
                                    </p>
                                    <div class="bottom-info">
                                        <span class="comment-time">{{ dateString(item.createdAt) }}</span>

                                        <!-- <span class="comment-little-btn" style="margin-left: 20px;"
                                            onclick="sendChilld(${item.id})">回复</span> -->
                                    </div>
                                    <div class="little-comment-list">
                                        <div class="little-comment" v-for="(child, index2) in item.childrenList"
                                            :key="index2">
                                            <img :src="child.avatar
                                                " alt="" />
                                            <h4 class="little-comment-userName">{{ child.userName }}</h4>
                                            <p class="little-comment-comment">
                                                {{ child.comment }}
                                            </p>
                                            <span class="little-comment-time">{{ dateString(child.createdAt) }}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="right">
                    <div class="courselist">
                        <h3 style="font-weight: 700;">课程章节</h3>
                        <div class="demo-collapse" style="width: 100%;">
                            <el-collapse accordion>

                                <el-collapse-item :title="item.name" :name="index"
                                    v-for="(item, index) in detailData.courseChapterList">
                                    <div v-for="(v, i) in item.courseChapterVideoList" :key="i"
                                        style="margin-bottom: 15px;cursor: pointer;padding: 5px;"
                                        @click="changevideoSrc(v.videoUrl, i)"
                                        :class="leindexList[index] === i ? 'active' : ''">
                                        {{ v.name }}
                                    </div>

                                </el-collapse-item>

                            </el-collapse>
                        </div>
                    </div>

                    <div class="video-list">
                        <div class="video-item" v-for="(element, index) in videos" :key="index"
                            @click="toVideoDetaik(element.id)">
                            <img :src="element.imgUrl" alt="" />
                            <div class="left-info">
                                <div class="title">
                                    {{ element.name }}
                                </div>
                                <div class="up">
                                    <span class="upIcon">UP</span>
                                    <p>{{ element.userName }}</p>
                                </div>
                                <div class="icons">
                                    <span class="toolItem" style="margin-right: 15px;">
                                        <el-icon size="20" color="#888">
                                            <View />
                                        </el-icon>
                                        {{ element.playNum }}
                                    </span><span class="toolItem">
                                        <el-icon size="20" color="#888">
                                            <ChatLineRound />
                                        </el-icon>
                                        {{ element.momentCommentNum }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>






        </section>
    </div>
</template>

<style scoped>
@import url(../../assets/css/custom.css);

@import url(../../assets/css/videoDetail.css);

.btnitem {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    margin-right: 30px !important;
}

.yespointer {
    color: #ff5000;
}

.yesstar {
    color: #ffbb00;
}

.ram {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .8);
    color: #fff;
    text-align: center;
    line-height: 500px;
    font-size: 24px;
    font-weight: 700;
}

.courselist {
    width: 100%;
    border: 1px solid #f2f2f2;
    padding: 10px;
    height: 400px;
    margin-top: 80px;
    box-shadow: 0 0 10px #00000045;
}

.active {
    background-color: #ff8000;
    color: #fff;
}

</style>