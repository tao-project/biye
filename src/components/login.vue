<!--
 * @Author: your name
 * @Date: 2020-11-08 13:13:24
 * @LastEditTime: 2020-11-11 14:59:25
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
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "不符合验证规则", trigger: "blur" },
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
          const { data: result } = await this.$http.post(
            "login",
            this.formData
          );
          if (result.meta.status == 200) {
            this.$message({
              type: "success",
              message: "登录成功",
              duratin: 3,
            });
            console.log(result);
            // 将token保存到sessionStorage中
            window.sessionStorage.setItem("token", result.data.token);
            // 通过编程式路由导航跳转
            this.$router.push("/home");
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
  width: 450px;
  height: 300px;
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
    // 提交按钮
    .form-btn {
      float: right;
    }
  }
}
</style>