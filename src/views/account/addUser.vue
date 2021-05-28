<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input style="width: 400px" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input style="width: 400px" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input style="width: 400px" v-model="ruleForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input style="width: 400px" v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input style="width: 400px" v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleCode">
        <el-select v-model="ruleForm.roleCode" placeholder="请选择角色">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/api/table'

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        nickName: '',
        age: '',
        address: '',
        roleCode: ''
      },
      rules: {
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
          { min: 1, max: 2, message: '长度在 1 到 2 个数字', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 1, max: 18, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.ruleForm).then(response => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.resetForm('ruleForm');
          }).catch(reason => {
            this.$message.error("添加失败!");
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
