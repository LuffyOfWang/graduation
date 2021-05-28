<template>
  <div class="app-container">
    <div style="padding-bottom: 30px">
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            clearable>
          </el-input>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入年龄"
            v-model="age"
            clearable>
          </el-input>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入角色描述"
            v-model="roleDescription"
            clearable>
          </el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入地址"
            v-model="address"
            clearable>
          </el-input>
        </div></el-col>
        <el-col :span="1.5"><div class="grid-content bg-purple">
          <el-button @click="fetchData(1)" icon="el-icon-thumb"  type="primary">查询</el-button>
        </div></el-col><el-col :span="2"><div class="grid-content bg-purple">
        <el-button @click="fetchData(1,true)" icon="el-icon-refresh"   type="primary">刷新</el-button>
      </div></el-col>
      </el-row>
    </div>
  <el-table
    v-loading="listLoading"
    :data="list"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    :row-class-name="tableRowClassName">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="昵称"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-user-solid"></i>
        <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="年龄"
      width="120">
      <template slot-scope="scope">
        <i class="el-icon-magic-stick"></i>
        <span style="margin-left: 10px">{{ scope.row.age }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      width="300">
      <template slot-scope="scope">
        <i class="el-icon-house"></i>
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="角色描述"
      width="280">
      <template slot-scope="scope">
        <i class="el-icon-chat-line-round"></i>
        <span style="margin-left: 10px">{{ scope.row.roleDescription }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm
          style="padding-left: 20px"
          confirmButtonText='好的'
          cancelButtonText='不用了'
          @onConfirm="handleDelete(scope.row.id)"
          icon="el-icon-info"
          iconColor="red"
          title="确定要删除该条数据吗？">
          <el-button size="mini"
                     type="danger" slot="reference">删除</el-button>
        </el-popconfirm>
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input style="width: 400px" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input style="width: 400px" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input style="width: 400px" v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input style="width: 400px" v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input style="width: 400px" v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleCode">
              <el-select v-model="form.roleCode" placeholder="请选择角色">
                <el-option label="管理员" value="1"></el-option>
                <el-option label="普通用户" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">提交</el-button>
              <el-button @click="cancel()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    :page-size="size"
    :current-page="page"
    layout="total, prev, pager, next, jumper"
    :total="total"
    style="padding-top: 40px"
    @current-change="fetchData">
  </el-pagination>
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import { updateUser, deleteAccountById, getAccountList } from '@/api/table'

export default {
  data() {
    return {
      form: {
        id: '',
        age: '',
        username: '',
        address: '',
        roleCode: '',
        nickName: '',
        password: ''
      },rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 1, max: 18, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      list: null,
      page: 1,
      size: 10,
      total: 0,
      age: null,
      address: null,
      username: null,
      roleDescription: null,
      accountDTO:{},
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.roleCode === '管理员') {
            this.form.roleCode = 1;
          }
          if (this.form.roleCode === '普通用户') {
            this.form.roleCode = 2;
          }
          updateUser(this.form).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.resetForm('form');
            this.dialogFormVisible = false;
            this.fetchData(1);
          }).catch(reason => {
            this.$message.error("修改失败!");
          })
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.resetForm('form');
      this.dialogFormVisible = false;
    },
    fetchData(page,clear) {

      if (page) {
        this.page = page;
      }
      if (clear) {
        this.page = 1;
        this.age = null;
        this.username = null;
        this.address = null;
        this.roleDescription = null;
        this.accountDTO = {};
      }
      if(this.age) {
        this.accountDTO.age = this.age;
      }
      if(this.username) {
        this.accountDTO.username = this.username;
      }
      if(this.address) {
        this.accountDTO.address = this.address;
      }
      if(this.roleDescription) {
        this.accountDTO.roleDescription = this.roleDescription;
      }
      this.accountDTO.page = this.page;
      this.accountDTO.size = this.size;
      this.listLoading = true;
      getAccountList(this.accountDTO).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.form.id = row.id;
      this.form.username = row.username;
      this.form.password = row.password;
      this.form.address = row.address;
      this.form.age = row.age;
      this.form.nickName = row.nickName;
      if (row.roleCode === 1) {
        this.form.roleCode = '管理员';
      } else {
        this.form.roleCode = '普通用户';
      }

      this.dialogFormVisible = true;
    },
    handleDelete(id) {
      deleteAccountById(id).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.fetchData(1,true)
      }).catch(reason => {
        this.$message.error(reason.data.errorMessage);
      })
    },
    handleSelectionChange(val) {
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      } else if (rowIndex === 5) {
        return 'warning-row';
      } else if (rowIndex === 7) {
        return 'success-row';
      }
      return '';
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
