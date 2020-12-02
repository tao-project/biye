<!--
 * @Author: your name
 * @Date: 2020-11-08 13:13:24
 * @LastEditTime: 2020-12-02 20:12:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-peoject\src\components\login.vue
-->
<template>
  <div class="login_container">
    <div class="login_box">
      <div class="portrait">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        label-width="80px"
        class="form-login"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <!-- 账号类型选择 -->
        <el-form-item label="类型" prop="value">
          <el-select v-model="formData.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <a href="javascript:;" @click="zhuce">注册账号</a>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加注册账号对话框 -->
    <el-dialog
      title="注册账号(学生)"
      :visible.sync="isDialogVisible"
      width="510px"
    >
      <!-- 这是添加用户表单 -->
      <el-form
        label-width="80px"
        :model="addUserData"
        :rules="addUserRules"
        ref="addUserRef"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="addUserData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    //自定义邮箱验证规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      // 判断注册对话框是否隐藏
      isDialogVisible: false,
      formData: {
        username: "admin",
        password: "123456",
        value: "", //选项框中的值
      },
      // options下拉框中的数据
      options: [
        { value: "0", label: "学生" },
        { value: "1", label: "老师" },
        { value: "2", label: "管理员", disabled: true },
      ],
      // 登录验证
      rules: {
        value: [
          { required: true, message: "请选择账号类型", triggger: "change" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "不符合验证规则", trigger: "blur" },
        ],
      },
      // 添加用户数据
      addUserData: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加用户表单-->验证规则
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 8, message: "用户名长度在6~8之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "密码长度在6~8之间", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login: function () {
      this.$refs.formRef.validate(async (valid, err) => {
        if (!valid) {
          return;
        } else {
          // 对账号类型进行判断

          const { data: result } = await this.$http.post(
            "login",
            this.formData
          );
          // 登录成功的数据
          console.log(result.meta);
          console.log(this.formData.value);
          if (result.meta.status == 200) {
            this.$message({
              type: "success",
              message: "登录成功",
              duratin: 3,
            });
            console.log(result);
            // 将token保存到sessionStorage中
            window.sessionStorage.setItem("token", result.meta.token);
            // 通过编程式路由导航跳转
            // this.$router.push("/home");
          } else {
            console.log("登录失败");
          }
        }
      });
    },
    // 获取表单实例,并且清空表单
    resetForm: function () {
      this.$refs.formRef.resetFields();
    },
    //显示注册账号对话框
    zhuce: function () {
      this.isDialogVisible = true;
    },
    addUser: function () {
      this.$refs.addUserRef.validate(async (valid) => {
        if (valid) {
          const { data: result } = await this.$http.post(
            "addUser",
            this.addUserData
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  width: 100%;
  height: 100%;
}
.login_box {
  width: 480px;
  height: 330px;
  border-radius: 3px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //头像
  .portrait {
    width: 130px;
    height: 130px;
    background-color: #fff;
    border-radius: 50%;
    padding: 8px;
    border: 1px solid black;
    box-shadow: 0 0 10px gray;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  // input表单
  .form-login {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    label {
      text-align: left;
    }
    .el-select {
      width: 100%;
    }
    // 提交按钮
    .form-btn {
      .el-button {
        float: left;
      }
      a {
        float: right;
      }
    }
  }
}
</style>