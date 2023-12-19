<template>
    <el-container v-loading="loading" style="display: flex; flex-direction: column;">
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="addFormVisible = true" size="mini">添加商品</el-button>
            </el-col>
        </el-row>
        <el-tabs type="border-card" @tab-click="handleTabsclick" style="margin-top: 10px;">
            <el-tab-pane v-for="(item, index) in tabData" :key="index" :label="item.label" :name="item.value">
                <el-table :data="goodsData.records" tooltip-effect="dark" style="width: 100%;">
                    <el-table-column prop="id" label="ID" width="50"></el-table-column>
                    <el-table-column label="图片" prop="cover" width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.cover" alt="" style="width: 80px; object-fit: cover;">
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="name" width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="getGoodsInfo(scope.row)">
                                {{ scope.row.name }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="介绍" prop="description" width="250"></el-table-column>
                    <el-table-column label="价格" prop="price" width="100"></el-table-column>
                    <el-table-column label="分类" prop="typeName" width="150"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteById(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 15, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                :total="goodsData.total">
            </el-pagination>
        </div>


        <!-- 页面对话框 -->
        <el-dialog title="添加商品" :visible.sync="addFormVisible" width="30rem">
            <el-form :model="addForm">
                <el-form-item label="商品名称" label-width="20%" required>
                    <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="价格" label-width="20%" required>
                    <el-input v-model="addForm.price" autocomplete="off" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item label="库存" label-width="20%" required>
                    <el-input v-model="addForm.stock" autocomplete="off" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="20%" required>
                    <el-input type="textarea" v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="分类" label-width="20%" required>
                    <el-select v-model="addForm.typeId" placeholder="请选择分类" style="width: 22rem;">
                        <el-option v-for="item in typeData.records" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归类" label-width="20%" required>
                    <el-select v-model="addForm.type"  placeholder="请选择归类" style="width: 22rem;">
                        <el-option v-for="item in type2Data" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封面" label-width="20%" required>
                    <el-upload action="#" :on-preview="handlePreview" :before-remove="beforeRemove"
                        :file-list="addForm.cover" :http-request="handleCoverUpload" :limit="1"
                        accept="image/jpeg,image/png">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品图" label-width="20%" required>
                    <el-upload action="#" :on-preview="handlePreview" :before-remove="beforeRemove"
                        :file-list="addForm.images" :http-request="handleImagesUpload" :limit="2"
                        accept="image/jpeg,image/png">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">需要上传2张商品图</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addGoods" size="small">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog title="编辑商品" :visible.sync="editFormVisible" width="30rem">
            <el-form :model="editForm">
                <el-form-item label="商品名称" label-width="20%" required>
                    <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="价格" label-width="20%" required>
                    <el-input v-model="editForm.price" autocomplete="off" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item label="库存" label-width="20%" required>
                    <el-input v-model="editForm.stock" autocomplete="off" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="20%" required>
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="分类" label-width="20%" required>
                    <el-select v-model="editForm.typeId" placeholder="请选择分类" style="width: 22rem;">
                        <el-option v-for="item in typeData.records" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归类" label-width="20%" required>
                    <el-select v-model="editForm.type"  placeholder="请选择归类" style="width: 22rem;">
                        <el-option v-for="item in type2Data" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封面" label-width="20%" required>
                    <el-upload action="#" :on-preview="handlePreview" :before-remove="beforeRemove"
                        :file-list="editForm.cover" :http-request="handleCoverUpload" :limit="1"
                        accept="image/jpeg,image/png">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品图" label-width="20%" required>
                    <el-upload action="#" :on-preview="handlePreview" :before-remove="beforeRemove"
                        :file-list="editForm.images" :http-request="handleImagesUpload" :limit="2"
                        accept="image/jpeg,image/png">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">需要上传2张商品图</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="editGoods(editForm.id)" size="small">确 定</el-button>
            </div>
        </el-dialog>
        
        <el-dialog :visible.sync="previewVisible" width="30rem">
            <img width="100%" :src="previewImage" alt="">
        </el-dialog>
    </el-container>
</template>
  
<script>
import { adminRequest } from '@/api';
export default {
    data() {
        return {
            goodsData: [], // 商品数据
            loading: true,
            loadingTime: 500,
            searchType: "0",
            tabData: [
                { label: '全部商品', value: '' },
                { label: '蛋糕', value: "1" },
                { label: '面包', value: "2" },
                { label: '下午茶', value: "3"}
            ],
            addFormVisible: false,
            addForm: {
                name: '',
                price: '',
                stock: '',
                description: '',
                cover: [],
                images: [],
                typeId: '',
                type: ''
            },
            previewVisible: false,
            previewImage: '',
            typeData: [],
            type2Data: [
                { label: '无', value: 0},
                { label: '生日', value: 1},
                { label: '儿童', value: 2},
                { label: '聚会', value: 3}
            ],
            editFormVisible: false,
            editForm: {
                id: '',
                name: '',
                price: '',
                stock: '',
                description: '',
                cover: [],
                images: [],
                typeId: ''
            },
        }
    },
    methods: {
        loadData() {
            this.loading = true
            adminRequest.get('/goods', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                },
            }).then((res) => {
                if (res.data.code === 1) {
                    this.goodsData = res.data.data;
                    setTimeout(() => {
                        this.loading = false
                    }, this.loadingTime)
                } else {
                    this.$message.error(res.data.msg);
                }
            });
            adminRequest.get("/types").then((res) => {
                if (res.data.code === 1) {
                    this.typeData = res.data.data;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.loadData()
        },
        deleteById(row) {
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                adminRequest.delete('/goods/' + row.id)
                    .then((res) => {
                        if (res.data.code === 1) {
                            this.$message.success("删除成功");
                            this.loadData();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
            }).catch(() => { });
        },
        handleTabsclick(item) {
            this.loading = true
            adminRequest.get('/goods', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    typeId: item.name
                }
            }).then((res) => {
                if (res.data.code === 1) {
                    this.goodsData = res.data.data;
                    setTimeout(() => {
                        this.loading = false
                    }, this.loadingTime)
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        async handleCoverUpload(file) {
            const formData = new FormData();
            formData.append('image', file.file);
            const res = await adminRequest.post('/upload', formData);
            if (res.data.code === 1) {
                this.$message.success("上传成功");
                this.addForm.cover = [{
                    name: res.data.data.name,
                    url: res.data.data.url
                }]
                console.log(file)
            } else {
                this.$message.error(res.data.msg);
            }
        },
        async handleImagesUpload(file) {
            const formData = new FormData();
            formData.append('image', file.file);
            const res = await adminRequest.post('/upload', formData)
            if (res.data.code === 1) {
                this.$message.success("上传成功");
                this.addForm.images.push(
                    {
                        name: res.data.data.name,
                        url: res.data.data.url
                    }
                )
            } else {
                this.$message.error(res.data.msg);
            }
        },
        handlePreview(file) {
            this.previewImage = file.url;
            this.previewVisible = true;
        },
        addGoods() {
            // 校验表单
            if (this.addForm.name === '') {
                this.$message.error("商品名称不能为空")
                return
            }
            if (this.addForm.price === '') {
                this.$message.error("商品价格不能为空")
                return
            }
            if (this.addForm.stock === '') {
                this.$message.error("商品库存不能为空")
                return
            }
            if (this.addForm.description === '') {
                this.$message.error("商品描述不能为空")
                return
            }
            if (this.addForm.typeId === '') {
                this.$message.error("商品分类不能为空")
                return
            }
            if (this.addForm.cover.length === 0) {
                this.$message.error("商品封面不能为空")
                return
            }
            if (this.addForm.images.length === 0) {
                this.$message.error("商品图不能为空")
                return
            }
            if (this.addForm.images.length !== 2) {
                this.$message.error("商品图必须为2张")
                return
            }
            const coverUrl = this.addForm.cover[0].url
            const imagesUrls = this.addForm.images.map(item => item.url)
            const dataToSend = {
                ...this.addForm,
                cover: coverUrl,
                images: imagesUrls
            };
            adminRequest.post('/goods', dataToSend).then(res => {
                if (res.data.code === 1) {
                    this.$message.success("添加成功")
                    this.loadData()
                    this.addFormVisible = false
                    this.addForm = {
                        name: '',
                        price: '',
                        stock: '',
                        description: '',
                        cover: [],
                        images: [],
                        typeId: ''
                    }
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        showEdit(row) {
            this.editFormVisible = true
            this.editForm = row
            this.editForm.cover = [{
                name: row.cover,
                url: row.cover
            }]
            // row.image1 && row.image2
            this.editForm.images = [
                {
                    name: row.image1,
                    url: row.image1
                },
                {
                    name: row.image2,
                    url: row.image2
                }
            ]
        },
        editGoods(goodsId) {
            // 校验表单
            if (this.editForm.name === '') {
                this.$message.error("商品名称不能为空")
                return
            }
            if (this.editForm.price === '') {
                this.$message.error("商品价格不能为空")
                return
            }
            if (this.editForm.stock === '') {
                this.$message.error("商品库存不能为空")
                return
            }
            if (this.editForm.description === '') {
                this.$message.error("商品描述不能为空")
                return
            }
            if (this.editForm.typeId === '') {
                this.$message.error("商品分类不能为空")
                return
            }
            if (this.editForm.cover.length === 0) {
                this.$message.error("商品封面不能为空")
                return
            }
            if (this.editForm.images.length === 0) {
                this.$message.error("商品图不能为空")
                return
            }
            if (this.editForm.images.length !== 2) {
                this.$message.error("商品图必须为2张")
                return
            }
            const coverUrl = this.editForm.cover[0].url
            const imagesUrls = this.editForm.images.map(item => item.url)
            const dataToSend = {
                ...this.editForm,
                cover: coverUrl,
                images: imagesUrls
            };
            adminRequest.put('/goods/' + goodsId, dataToSend).then(res => {
                if (res.data.code === 1) {
                    this.$message.success("编辑成功")
                    this.loadData()
                    this.editFormVisible = false
                    this.editForm = {
                        id: '',
                        name: '',
                        price: '',
                        stock: '',
                        description: '',
                        cover: [],
                        images: [],
                        typeId: ''
                    }
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
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
