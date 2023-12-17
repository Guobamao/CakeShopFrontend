<template>
    <el-container style="display: flex; flex-direction: column; margin: 0 auto;">
        <el-carousel height="483px">
            <el-carousel-item v-for="item in carouselData" :key="item.id"
                style="width: 100%; height: 483px; overflow: hidden; text-align: center; backface-visibility: hidden;">
                <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.goodsId } }"
                    :style="{ backgroundImage: `url(${item.image})` }" class="carouselImg">
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <el-container style="display: flex; flex-direction: column; margin: 0 auto; width: 1200px;">
            <el-row style="margin-top: 20px; display: flex; justify-content: space-between;">
                <a href="#newList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/%E6%96%B0%E5%93%81.jpg" alt=""
                        class="type-image">
                </a>

                <a href="#birthdayList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/%E7%94%9F%E6%97%A5.jpg" alt=""
                        class="type-image">
                </a>

                <a href="#childList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/%E5%84%BF%E7%AB%A5.jpg" alt=""
                        class="type-image">
                </a>

                <a href="#partyList">
                    <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/%E8%81%9A%E4%BC%9A.jpg" alt=""
                        class="type-image">
                </a>
            </el-row>

            <el-row id="newList" style="margin-top: 50px; display: flex; flex-direction: column;">
                <h2>新品上市</h2>
                <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/new.jpg" alt="">
                <div style="display: flex; flex-wrap: wrap; margin-top: 10px;">
                    <el-card v-for="item in newList" :key="item.id" :body-style="{ padding: '0' }" shadow="never"
                        class="card" style="border: none;">
                        <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }">
                            <img :src="item.cover" alt="" width="228" height="246" class="image" style="object-fit: cover;">
                        </router-link>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }"
                                style="display: flex; flex-direction: column; align-items: center;">
                                <span style="font-size: 0.8rem;">{{ item.name }}</span>
                                <span style="font-size: 0.8rem; text-wrap: wrap;">{{ item.description }}</span>
                                <span style="font-size: 0.8rem;">￥{{ item.price }}/一个</span>
                            </router-link>
                            <!-- 加入购物车 -->
                            <el-link type="warning" size="mini" @click="addToCart(item.id)" style="margin-top: 5px;">加入购物车</el-link>
                        </div>
                    </el-card>
                </div>
            </el-row>
            <el-row id="birthdayList" style="margin-top: 50px; display: flex; flex-direction: column;">
                <h2>生日</h2>
                <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/birthday.jpg" alt="">
                <div style="display: flex; flex-wrap: wrap; margin-top: 10px;">
                    <el-card v-for="item in birthdayList" :key="item.id" :body-style="{ padding: '0' }" shadow="never"
                        class="card" style="border: none;">
                        <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }">
                            <img :src="item.cover" alt="" width="228" height="246" class="image" style="object-fit: cover;">
                        </router-link>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }"
                                style="display: flex; flex-direction: column; align-items: center;">
                                <span style="font-size: 0.8rem;">{{ item.name }}</span>
                                <span style="font-size: 0.8rem;">{{ item.description }}</span>
                                <span style="font-size: 0.8rem;">￥{{ item.price }}/一个</span>
                            </router-link>
                            <!-- 加入购物车 -->
                            <el-link type="warning" size="mini" @click="addToCart(item.id)" style="margin-top: 5px;">加入购物车</el-link>
                        </div>
                    </el-card>
                </div>
            </el-row>
            <el-row id="childList" style="margin-top: 50px; display: flex; flex-direction: column;">
                <h2>儿童</h2>
                <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/children.jpg" alt="">
                <div style="display: flex; flex-wrap: wrap; margin-top: 10px;">
                    <el-card v-for="item in childList" :key="item.id" :body-style="{ padding: '0' }" shadow="never"
                        class="card" style="border: none;">
                        <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }">
                            <img :src="item.cover" alt="" width="228" height="246" class="image" style="object-fit: cover;">
                        </router-link>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }"
                                style="display: flex; flex-direction: column; align-items: center;">
                                <span style="font-size: 0.8rem;">{{ item.name }}</span>
                                <span style="font-size: 0.8rem;">{{ item.description }}</span>
                                <span style="font-size: 0.8rem;">￥{{ item.price }}/一个</span>
                            </router-link>
                            <!-- 加入购物车 -->
                            <el-link type="warning" size="mini" @click="addToCart(item.id)" style="margin-top: 5px;">加入购物车</el-link>
                        </div>
                    </el-card>
                </div>
            </el-row>
            <el-row id="partyList" style="margin-top: 50px; display: flex; flex-direction: column;">
                <h2>聚会</h2>
                <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/party.jpg" alt="">
                <div style="display: flex; flex-wrap: wrap; margin-top: 10px;">
                    <el-card v-for="item in partyList" :key="item.id" :body-style="{ padding: '0' }" shadow="never"
                        class="card" style="border: none;">
                        <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }">
                            <img :src="item.cover" alt="" width="228" height="246" class="image" style="object-fit: cover;">
                        </router-link>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }"
                                style="display: flex; flex-direction: column; align-items: center;">
                                <span style="font-size: 0.8rem;">{{ item.name }}</span>
                                <span style="font-size: 0.8rem;">{{ item.description }}</span>
                                <span style="font-size: 0.8rem;">￥{{ item.price }}/一个</span>
                            </router-link>
                            <!-- 加入购物车 -->
                            <el-link type="warning" size="mini" @click="addToCart(item.id)" style="margin-top: 5px;">加入购物车</el-link>
                        </div>
                    </el-card>
                </div>
            </el-row>
        </el-container>
    </el-container>
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
        // 获取轮播图数据
        getCarouselData() {
            userRequest.get("/banner/carousel").then(res => {
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
        // 获取新品列表
        getNewList() {
            userRequest.get("/goods/new").then(res => {
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
            userRequest.get("/goods/party").then(res => {
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
            userRequest.get("/goods/child").then(res => {
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
            userRequest.get("/goods/birthday").then(res => {
                if (res.data.code === 1) {
                    this.birthdayList = res.data.data
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: res.data.msg,
                    })
                }
            })
        },
        addToCart(id) {
            userRequest.post("/cart/add", { goodsId: id }).then(res => {
                if (res.data.code === 1) {
                    this.$notify({
                        title: "成功",
                        message: res.data.msg,
                        type: "success",
                    })
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

<style>
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
    margin: auto 1.5rem;
    max-width: 246px;
    min-width: 246px;
}

.carouselImg {
    width: 100%;
    height: 100%;
    display: inline-block;
    background-position: center center;
    background-repeat: no-repeat;
    transform: scale(1);
    backface-visibility: hidden;
}

.image {
    background: #fafafa;
    border-radius: 10px;
}
</style>