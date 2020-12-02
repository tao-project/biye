<!--
 * @Author: your name
 * @Date: 2020-11-11 15:01:37
 * @LastEditTime: 2020-11-13 10:18:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-peoject\src\components\home.vue
-->
<template>
  <!-- <div>
    <el-button type="info" @click="exit_login">退出登录</el-button>
  </div> -->
  <el-container class="home-container">
    <!-- 顶部 -->
    <el-header>
      <div>
        <img src="../assets/logo1.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="exit_login">退出登录</el-button>
    </el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="this.iscollapse == true ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleChange">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="iscollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activeUrl"
        >
          <el-submenu
            :index="String(item.id)"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconfont[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + value.path"
              v-for="value in item.children"
              :key="value.id"
              @click="saveActive('/' + value.path)"
            >
              <i class="iconfont icon-74wodedingdan"></i>
              <span slot="title">{{ value.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧边栏 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      // 是否开启按钮折叠
      iscollapse: false,
      // 标记点击的路由
      activeUrl: "",
      // 第一级菜单图标
      iconfont: {
        125: "iconfont icon-yonghu",
        103: "iconfont icon-quanxian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-74wodedingdan",
        145: "iconfont icon-shuju",
      },
    };
  },
  created() {
    this.getMenuList();
    this.activeUrl = window.sessionStorage.getItem("active");
  },
  methods: {
    // 退出登录
    exit_login: function () {
      // 通过清空token 退出登录
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取侧边栏方法
    getMenuList: async function () {
      const { data: result } = await this.$http.get("menus");
      if (result.meta.status !== 200)
        return this.$message.error("数据请求失败");
      this.menuList = result.data;
      console.log(this.menuList);
    },
    // 折叠按钮方法
    toggleChange: function () {
      this.iscollapse = !this.iscollapse;
    },
    // 保存标记的状态
    saveActive: function (e) {
      window.sessionStorage.setItem("active", e);
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blueviolet;
  div {
    display: flex;
    align-items: center;
    font-size: 25px;
    color: #000000;
    img {
      margin-right: 10px;
    }
  }
}
.el-aside {
  background-color: #515c64;
  .toggle-button {
    text-align: center;
    background-color: dimgray;
    cursor: pointer;
    letter-spacing: 5px;
  }
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: chartreuse;
}
.iconfont {
  margin-right: 10px;
}
</style>