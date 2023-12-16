<template>
    <div>
        <el-carousel height="483px">
            <el-carousel-item v-for="item in carouselData" :key="item"
                style="width: 100%; height: 483px; min-width: 980px; overflow: hidden; text-align: center; backface-visibility: hidden;">
                <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }"
                    :style="{ backgroundImage: `url(${item.image})` }"
                    style="width: 100%; height: 100%; display: inline-block; background-position: center center; background-repeat: no-repeat; transform: scale(1); backface-visibility: hidden;">
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <el-row style="width: 70%; margin: auto; margin-top: 20px;">
            <el-col :span="6">
                <a href="#newList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/889439561ba83c8ce1cdb960f0e90cf1.jpg" alt=""
                        class="type-image">
                </a>
            </el-col>
            <el-col :span="6">
                <a href="#birthdayList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/66a9e99bfc4043389492e86e651cdf21.jpg" alt=""
                        class="type-image">
                </a>
            </el-col>
            <el-col :span="6">
                <a href="#childList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/2b0753c02bc2ae83b3cc03e9c81d9e0b.jpg" alt=""
                        class="type-image">
                </a>
            </el-col>
            <el-col :span="6">
                <a href="#partyList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/85b21a9105c4cd50d4993e8e44d31af3.jpg" alt=""
                        class="type-image">
                </a>
            </el-col>
        </el-row>
        <el-row id="newList" style="width: 70%; margin: auto; margin-top: 20px;">
            <h2>新品上市</h2>
            <div style="display: flex;">
                <el-card v-for="item in newList" :key="item.id" :body-style="{ padding: '14px' }" shadow="never" class="card">
                    <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                        <img :src="item.image" alt="" width="200" height="200" :fit="cover" class="image">
                    </router-link>
                    <div>
                        <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                            <p>{{ item.name }}</p>
                            <p class="goods_description">{{ item.description }}</p>
                        </router-link>
                    </div>
                </el-card>
            </div>
        </el-row>
        <el-row id="birthdayList" style="width: 70%; margin: auto; margin-top: 20px;">
            <h2>生日</h2>
            <div style="display: flex;">
                <el-card v-for="item in birthdayList" :key="item.id" :body-style="{ padding: '14px' }" shadow="never" class="card">
                    <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                        <img :src="item.image" alt="" width="200" height="200" :fit="cover" class="image">
                    </router-link>
                    <div>
                        <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                            <p>{{ item.name }}</p>
                            <p class="goods_description">{{ item.description }}</p>
                        </router-link>
                    </div>
                </el-card>
            </div>
        </el-row>
        <el-row id="childList" style="width: 70%; margin: auto; margin-top: 20px;">
            <h2>儿童</h2>
            <div style="display: flex;">
                <el-card v-for="item in childList" :key="item.id" :body-style="{ padding: '14px' }" shadow="never" class="card">
                    <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                        <img :src="item.image" alt="" width="200" height="200" :fit="cover" class="image">
                    </router-link>
                    <div>
                        <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                            <p>{{ item.name }}</p>
                            <p class="goods_description">{{ item.description }}</p>
                        </router-link>
                    </div>
                </el-card>
            </div>
        </el-row>
        <el-row id="partyList" style="width: 70%; margin: auto; margin-top: 20px;">
            <h2>聚会</h2>
            <div style="display: flex;">
                <el-card v-for="item in partyList" :key="item.id" :body-style="{ padding: '14px' }" shadow="never" class="card">
                    <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                        <img :src="item.image" alt="" width="200" height="200" :fit="cover" class="image">
                    </router-link>
                    <div>
                        <router-link :to="{ path: '/goods_detail', query: { id: item.goodsId } }">
                            <p>{{ item.name }}</p>
                            <p class="goods_description">{{ item.description }}</p>
                        </router-link>
                    </div>
                </el-card>
            </div>
        </el-row>
    </div>
</template>

<script>
import { userRequest } from '@/api'
export default {
    data() {
        return {
            carouselData: [],
            newList: [],
            birthdayList: [],
            childList: [],
            partyList: [],
        }
    },
    methods: {
        getCarouselData() {
            userRequest.get("/top/recommend").then(res => {
                if (res.data.code === 1) {
                    this.carouselData = res.data.data
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: res.data.msg,
                    })
                }
            })
        },
        getNewList() {
            userRequest.get("/top/new").then(res => {
                if (res.data.code === 1) {
                    this.newList = res.data.data
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: res.data.msg,
                    })
                }
            })
        },
        getPartyList() {
            userRequest.get("/top/party").then(res => {
                if (res.data.code === 1) {
                    this.partyList = res.data.data
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: res.data.msg,
                    })
                }
            })
        },
        getChildList() {
            userRequest.get("/top/child").then(res => {
                if (res.data.code === 1) {
                    this.childList = res.data.data
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: res.data.msg,
                    })
                }
            })
        },
        getBirthdayList() {
            userRequest.get("/top/birthday").then(res => {
                if (res.data.code === 1) {
                    this.birthdayList = res.data.data
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: res.data.msg,
                    })
                }
            })
        }
    },
    created() {
        this.getCarouselData();
        this.getNewList();
        this.getPartyList();
        this.getChildList();
        this.getBirthdayList();
    }
}
</script>

<style scoped>
.type-image {
    border-radius: 18px;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow: 16px 16px 32px #b5b5b5, -16px -16px 32px #ffffff;
}

.goods_description {
    font-size: .925rem;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

* {
    scroll-margin-top: 60px;
}

.card {
    margin-right: 15px;
}
</style>