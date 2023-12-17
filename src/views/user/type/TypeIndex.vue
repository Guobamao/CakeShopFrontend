<template>
    <el-container v-loading="loading" style="display: flex; flex-direction: column; width: 1200px; margin: 0 auto; margin-top: 20px; ">
        <el-form :inline="true" :model="typeForm" size="small">
            <el-form-item label="分类">
                <el-radio-group v-model="typeForm.typeRadio" @change="handleTypeChange">
                    <el-radio v-for="item in typeList" :key="item.id" :label="item.id">
                        {{ item.name }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <el-row style="margin-top: 50px;">
            <div style="display: flex; flex-wrap: wrap;">
                <el-card v-for="item in goodsData" :key="item.id" :body-style="{ padding: '0' }" shadow="never" class="card" style="border: none;">
                    <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }">
                        <img :src="item.cover" alt="" width="228" height="246" class="image" style="object-fit: cover;">
                    </router-link>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <router-link :to="{ path: '/user/goods/goods_detail', query: { id: item.id } }" style="display: flex; flex-direction: column; align-items: center;">
                            <span style="font-size: 0.8rem;">{{ item.name }}</span>
                            <span style="font-size: 0.8rem;">￥{{ item.price }}/一个</span>
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
            userRequest.get("/types/list/" + this.typeForm.typeRadio).then(res => {
                if (res.data.code === 1) {
                    this.goodsData = res.data.data;
                    setTimeout(() => {
                        this.loading = false;
                    }, this.loadingTime)
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        handleTypeChange() {
            this.loadData()
        }
    },
    created() {
        this.getTypeList()
        this.loadData()
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
</style>