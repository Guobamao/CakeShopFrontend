<template>
    <el-container v-loading="loading" style="display: flex; flex-direction: column; width: 1200px; margin: 0 auto; ">
        <img src="https://cakeshop-009.oss-cn-beijing.aliyuncs.com/1.png" alt="">
        <el-row style="margin-top: 20px;" v-for="item in goodsData" :key="item.id">
            <h2 style="text-align: center; margin-bottom: 20px;">{{ item.type }}</h2>
            <div style="display: flex; flex-wrap: wrap;">
                <el-card v-for="goods in item.data" :key="goods.id" :body-style="{ padding: '0' }" shadow="never" class="card"
                    style="border: none;">
                    <router-link :to="{ path: '#', query: { id: goods.id } }">
                        <img :src="goods.cover" alt="" width="228" height="246" class="image" style="object-fit: cover;">
                    </router-link>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <router-link :to="{ path: '#', query: { id: goods.id } }"
                            style="display: flex; flex-direction: column; align-items: center;">
                            <span style="font-size: 0.8rem;">{{ goods.name }}</span>
                            <span style="font-size: 0.8rem;">￥{{ goods.price }}/一个</span>
                        </router-link>
                        <!-- 加入购物车 -->
                        <el-link type="warning" size="mini" @click="addToCart(item.id)" style="margin-top: 5px;">加入购物车</el-link>
                    </div>
                </el-card>
            </div>
        </el-row>
    </el-container>
</template>

<script>
import { userRequest } from '@/api'
export default {
    data() {
        return {
            typeForm: {
                typeRadio: 1
            },
            goodsData: [],
            loading: true,
            loadingTime: 500,
            typeList: []
        }
    },
    methods: {
        getTypeList() {
            userRequest.get("/types").then(res => {
                if (res.data.code === 1) {
                    this.typeList = res.data.data;
                    this.loadData()
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.msg
                    })
                }
            })
        },
        loadData() {
            this.loading = true;
            for (let i = 0; i < this.typeList.length; i++) {
                userRequest.get("/goods/new/" + this.typeList[i].id).then(res => {
                    if (res.data.code === 1) {
                        this.goodsData.push({
                            type: this.typeList[i].name,
                            data: res.data.data
                        })
                        setTimeout(() => {
                            this.loading = false;
                        }, this.loadingTime)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            }
            console.log(this.goodsData)
        }
    },
    created() {
        this.getTypeList()
    }
}
</script>

<style scoped>
.type-image {
    border-radius: 18px;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow: 16px 16px 32px #b5b5b5, -16px -16px 32px #ffffff;
}

* {
    scroll-margin-top: 60px;
}

.card {
    margin: auto 1.5rem;
    max-width: 246px;
    min-width: 246px;
}
.image {
    background: #fafafa;
}
</style>