<template>
    <el-container v-loading="loading" style="display: flex; flex-direction: column; ">
        <el-form :inline="true" :model="searchForm" size="small">
            <el-form-item label="姓名">
                <el-input v-model="searchForm.name" placeholder="姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="searchForm.phone" placeholder="手机号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="usersData.records" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="username" label="用户名" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column label="联系方式" prop="phone" width="150"></el-table-column>
            <el-table-column label="地址" prop="address" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" plain @click="resetPassword(scope.row)">重置密码</el-button>
                    <el-button type="primary" size="mini" plain @click="showEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" plain @click="deleteById(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 15, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                :total="usersData.total">
            </el-pagination>
        </div>

        <!-- 页面对话框 -->
        <!-- 读者编辑对话框 -->
        <el-dialog title="编辑信息" :visible.sync="editFormVisible" width="30rem" style="max-height: fit-content;">
            <el-form :model="editForm">
                <el-form-item label="用户名" label-width="20%">
                    <el-input v-model="editForm.username" autocomplete="off" placeholder="请输入用户名" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="20%" required>
                    <el-input v-model="editForm.email" autocomplete="off" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="20%" required>
                    <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" label-width="20%" required>
                    <el-input v-model="editForm.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item label="地址" label-width="20%" required>
                    <el-input v-model="editForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitInfo(editForm.id)" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
import { adminRequest } from '@/api';
export default {
    data() {
        return {
            searchForm: {
                name: '',
                phone: ''
            },
            usersData: [],
            editFormVisible: false,
            editForm: {
                id: '',
                username: '',
                name: '',
                address: '',
                phone: '',
                email: '',
            },
            loading: true,
            loadingTime: 500
        }
    },
    methods: {
        loadData() {
            this.loading = true
            adminRequest.get('/users', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(res => {
                if (res.data.code === 1) {
                    this.usersData = res.data.data
                    setTimeout(() => {
                        this.loading = false
                    }, this.loadingTime)
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        search() {
            this.loading = true
            adminRequest.get('/users', {
                params: {
                    name: this.searchForm.name,
                    phone: this.searchForm.phone
                }
            }).then(res => {
                if (res.data.code === 1) {
                    this.usersData = res.data.data
                    setTimeout(() => {
                        this.loading = false
                    }, this.loadingTime)
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.loadData()
        },
        showEdit(row) {
            this.editFormVisible = true
            this.editForm = row
        },
        submitInfo(UserId) {
            adminRequest.put('/users/' + UserId, this.editForm)
                .then(res => {
                    if (res.data.code === 1) {
                        this.$message.success("修改成功")
                        this.loadData()
                        this.editFormVisible = false
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
        },
        deleteById(row) {
            this.$confirm('确认删除该用户吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                adminRequest.delete('/users/' + row.id)
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$message.success('删除成功')
                            this.loadData()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            }).catch(() => { })
        },
        resetPassword(row) {
            this.$confirm('确认重置该用户密码吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                adminRequest.put('/users/' + row.id + '/password')
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$message.success('重置成功')
                            this.loadData()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            }).catch(() => { })
        }
    },
    mounted() {
    },
    created() {
        this.currentPage = 1
        this.pageSize = 10
        this.loadData()
    }
}
</script>

<style>
.el-dialog {
    max-height: 30rem;
    overflow-y: auto;
}
</style>