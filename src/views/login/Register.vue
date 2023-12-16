<template>
    <div class="layui-container">
        <div class="admin-login-background" style="top: 7%;">
            <el-form class="login-form" ref="registerForm" :model="registerForm" :rules="registerFormRules">
                <el-form-item class="logo-title">
                    <h1 style="margin: 0;">用户注册</h1>
                    <span style="line-height: 20px; margin: 10px 0 0 0;">蛋糕店</span>
                </el-form-item>

                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="registerForm.password" placeholder="密码"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input type="password" v-model="registerForm.password2" placeholder="确认密码"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="registerForm.name" placeholder="姓名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item name="phone">
                    <el-input v-model="registerForm.phone" placeholder="手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="register()" style="width: 100%;">注册</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$router.push('/login')" style="width: 100%;">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { userRequest } from '@/api'
export default {
    data() {
        return {
            registerForm: {
                username: '',
                password: '',
                password2: '',
                name: '',
                phone: '',
                address: ''
            },
            registerFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请确认密码', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        register() {
            this.$refs.registerForm.validate(valid => {
                if (valid) {
                    if (this.registerForm.password != this.registerForm.password2) {
                        this.$notify.error({
                            title: '注册失败',
                            message: '两次输入的密码不一致',
                        })
                        return;
                    }
                    userRequest.post('/register', {
                        username: this.registerForm.username,
                        password: this.registerForm.password,
                        password2: this.registerForm.password2,
                        name: this.registerForm.name,
                        phone: this.registerForm.phone
                    }).then(res => {
                        if (res.data.code == 1) {
                            this.$message.success('注册成功');
                            this.$router.push('/login');
                        } else {
                            this.$notify.error({
                                title: '注册失败',
                                message: res.data.msg,
                            })
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
@import "../../styles/login.css";
</style>