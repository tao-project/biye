<!--
 * @Author: your name
 * @Date: 2020-11-12 21:39:44
 * @LastEditTime: 2020-11-25 22:53:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-peoject\src\components\user\users.vue
-->
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="inputData">
          <el-button
            slot="append"
            icon="iconfont icon-sousuo"
            @click="searchUser"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 这是添加用户对话框 -->
    <el-dialog
      slot="title"
      :visible.sync="dialogVisible"
      @open="handle()"
      width="600px"
    >
      <!-- 这尼玛是添加用户表单 -->
      <el-form
        label-width="80px"
        :model="addUserData"
        :rules="addUserRules"
        ref="addUserRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码呀" prop="password">
          <el-input v-model="addUserData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格卡片 -->
    <el-card>
      <!-- 渲染数据到表格 -->
      <el-table :data="userData" stripe style="width: 100%">
        <el-table-column
          type="index"
          label="#"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <!-- 修改用户状态 -->
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#dbdfe6"
              @change="switchChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="iconfont icon-bianji" @click="modifyUser"></i>
            <!-- 删除用户 -->
            <el-tooltip
              effect="dark"
              content="点击删除用户"
              placement="right-start"
            >
              <i
                class="iconfont icon-delete"
                @click="deleteUser(scope.row)"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfor.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfor.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      >
      </el-pagination>
    </el-card>
    <!-- 分页 -->
  </div>
  <!-- 创建users数据页面 -->
</template>
<script>
export default {
  // 挂载生命周期函数
  created() {
    this.initUser();
  },
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
      userData: [], //用户数据
      // 分页功能-->请求参数
      queryInfor: {
        query: "", //查询参数
        pagenum: 1, //当前页码
        pagesize: 2, //每页条数
      },
      totalpage: 0, //总记录条数
      inputData: "", //搜索栏input用的数据
      dialogVisible: false, //设置添加对话框状态->是否显示
      // 添加用户-->请求参数
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
    handle: function () {
      console.log(111);
    },
    indexMethod: function (index) {
      return (
        index + 1 + (this.queryInfor.pagenum - 1) * this.queryInfor.pagesize
      );
    },
    // 初始化用户函数
    initUser: async function () {
      const { data: result } = await this.$http.get("users", {
        params: this.queryInfor,
      });
      if (result.meta.status !== 200)
        return this.$message.error("获取用户数据失败");
      this.userData = result.data.users;
      this.totalpage = result.data.total;
    },
    // 改变用户状态 注：错误还未修改  11.21用户状态修改完成
    switchChange: async function (userInfo) {
      const { data: result } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      console.log(result);
      if (result.meta.status !== 200) {
        return this.$message.error("修改用户失败");
        userInfo.mg_state = !userInfo.mg_state;
      }
      return this.$message.success("修改用户状态成功");
    },
    // 搜索用户
    searchUser: function () {
      if (this.inputData.trim() == "") {
        alert("您还没有添加数据");
      }
      this.queryInfor.query = this.inputData;
      this.initUser();
    },

    //添加用户函数
    addUser: function () {
      this.$refs.addUserRef.validate(async (valid) => {
        if (valid) {
          const { data: result } = await this.$http.post(
            "users",
            this.addUserData
          );
          console.log(result);
          if (result.meta.status !== 201) this.$message.error(result.meta.msg);
          else {
            this.$message.success("用户添加成功");
            this.dialogVisible = false;
            this.initUser();
          }
        } else {
          return false;
        }
      });
    },
    // 修改用户
    modifyUser: function () {
      this.dialogVisible = true;
    },
    // 删除用户
    deleteUser: async function (userInfor) {
      this.$confirm("是否永久删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: result } = await this.$http.delete(
            `users/${userInfor.id}`
          );
          console.log(result);
          if (result.meta.status == 200) {
            this.$message.success(result.meta.msg);
            this.initUser();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    // 每页展示条数
    handleSizeChange(newPageSize) {
      this.queryInfor.pagesize = newPageSize;
      this.initUser();
    },
    // 当前页
    handleCurrentChange(newPageNum) {
      this.queryInfor.pagenum = newPageNum;
      this.initUser();
    },
  },
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
.iconfont {
  font-size: 25px;
  cursor: pointer;
}
.icon-delete {
  margin-left: 10px;
}
</style>