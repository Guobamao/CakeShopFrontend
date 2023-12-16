<template>
    <div>
        <el-radio-group v-model="typeRadio">
            <el-radio v-for="item in typeList" :key="item" :label="item.id">
                {{ item.name }}
            </el-radio>
        </el-radio-group>
        <!-- <el-row v-for="item in typeData" :key="item" style="width: 70%; margin: auto; margin-top: 20px;">
            <h2>{{ item.name }}</h2>
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
        </el-row> -->
    </div>
</template>

<script>
import { userRequest } from '@/api'
export default {
    data() {
        return {
            typeRadio: '',
            typeList: []
        }
    },
    methods: {
        getTypeList() {
            userRequest.get("/type/list").then(res => {
                if (res.data.code === 1) {
                    this.typeList = res.data.data;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.msg
                    })
                }
            })
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