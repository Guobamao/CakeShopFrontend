<template>
    <!-- 页面主体容器 -->
    <el-container style="display: flex; justify-content: center;">
        <el-row>
            <el-card class="box-card" style="width: 500px;">
                <div slot="header" class="clearfix">
                    <span>用户信息</span>
                </div>
                <el-form label-width="20%" :model="userInfo" size="small">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" required>
                        <el-input v-model="userInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="userInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="userInfo.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                        <el-button @click="close">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </el-container>
</template>

<script>
import { userRequest } from '@/api'
export default {
    data() {
        return {
            userInfo: {
                username: '',
                name: '',
                phone: '',
                address: '',
                email: ''
            }
        }
    },
    methods: {
        getUserInfo() {
            userRequest.get("/info/" + this.userId).then(res => {
                if (res.data.code === 1) {
                    this.userInfo = res.data.data;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.msg
                    })
                }
            })
        },
        onSubmit() {
            userRequest.put("info/" + this.userId, this.userInfo).then(res => {
                if (res.data.code === 1) {
                    this.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    })
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.msg
                    })
                }
            })
        },
    },
    created() {
        this.userId = localStorage.getItem("id");
        this.getUserInfo()
    },
}
</script>