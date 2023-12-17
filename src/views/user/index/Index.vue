<template>
    <div>
        <el-container>
            <el-header style="padding: 0; position: fixed; width: 100%; z-index: 10;">
                <el-row>
                    <el-col :span="24" style="background-color: #ffc0cb;">
                        <div
                            style="display: flex; justify-content: center; align-items: center; color: white;font-weight: bold;">
                            <router-link to="/" style="font-size: 1.5rem;">
                                <i class="el-icon-s-home"></i>
                                <span style="margin-left: 10px">蛋糕店</span>
                            </router-link>
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                                text-color="#fff" active-text-color="#8470ff"
                                background-color="#ffc0cb" style="margin-left: 20px;">
                                <el-menu-item v-for="item in apiData" :key="item.name" :index="item.name"
                                    @click="handleMenuClick(item)">{{ item.title }}</el-menu-item>
                                <el-menu-item index="Order" v-if="this.username !== null"
                                    @click="gotoPage('order')">我的订单</el-menu-item>
                                <el-menu-item index="MyProfile" v-if="this.username !== null && this.isAdmin === '0'"
                                    @click="gotoPage('MyProfile')">个人中心</el-menu-item>
                                <el-menu-item index="Logout" v-if="this.username !== null"
                                    @click="gotoPage('logout')">退出</el-menu-item>
                                <el-menu-item index="login" v-else @click="gotoPage('login')">登录</el-menu-item>
                                <el-menu-item index="Admin" v-if="this.isAdmin === '1'"
                                    @click="gotoPage('admin')">后台管理</el-menu-item>
                                <el-menu-item index="Search" @click="gotoPage('search')" style="margin-left: 20px;">
                                    <i class="el-icon-search" style="color: white;"></i>
                                </el-menu-item>
                                <el-menu-item index="Cart" @click="gotoPage('cart')">
                                    <i class="el-icon-shopping-cart-2" style="color: white;"></i>
                                </el-menu-item>
                            </el-menu>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="margin-top: 60px; padding: 0; margin-bottom: 100px;">
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import userApi from "@/assets/user.json"
import { userRequest } from '@/api';
export default {
    data() {
        return {
            activeIndex: 'Home',
        };
    },
    methods: {
        handleMenuClick(item) {
            this.$router.push(item.path);
            sessionStorage.setItem("activeIndex", item.name);
        },
        gotoPage(page) {
            if (page === 'logout') {
                userRequest.post('/logout').then(res => {
                    if (res.data.code === 1) {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.reload()
                        this.$notify({
                            title: '成功',
                            message: '退出成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
            } else if (page === 'admin') {
                this.$router.push('/admin');
            } else if (page === 'MyProfile') {
                this.$router.push('/user/UserProfile')
            } else if (page === 'search') {
                // 未完成
                this.$alert('未完成', '提示', {
                    confirmButtonText: '确定',
                });
            } else if (page === 'cart') {
                // 未完成
                this.$alert('未完成', '提示', {
                    confirmButtonText: '确定',
                });
            } else if (page === 'login') {
                this.$router.push('/login')
            } else if (page === 'order') {
                // 未完成
                this.$alert('未完成', '提示', {
                    confirmButtonText: '确定',
                });
            }
        }
    },
    created() {
        this.apiData = userApi;
        this.username = localStorage.getItem("username");
        this.isAdmin = localStorage.getItem("isAdmin");
        this.activeIndex = sessionStorage.getItem("activeIndex");
    }
}
</script>

<style>
@import "../../../styles/index.css"
</style>