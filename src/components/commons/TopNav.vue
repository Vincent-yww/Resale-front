<template>
  <div>
    <el-row class="mytabrow">


      <el-col :md='{span: 4, offset:16}' :xs='{span: 8, offset: 4}' class="mytab">
        <el-dropdown v-if="login_status" @command="handleCommand">
      <span class="el-dropdown-link"><i class="el-icon-user-solid"></i>
        欢迎你，{{log_user.username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown" class="dropdownmenu">
            <el-dropdown-item icon="el-icon-s-tools">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-order">我的订单</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="/addgoods">出售商品</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-on">我的收藏</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close"><a @click="doLogOut">退出</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


        <span v-if="!login_status"><a href="/signin">登录  </a>|<a href="/signup">  注册</a></span>
      </el-col>


      <el-col :md="2" :xs="{span: 4,offset:2}">
        <el-button style="margin-top: 5px" type="text" @click="dialogFormVisible = true" v-model="selectedSchoolName"><i
          class="el-icon-location"/>{{ selectedSchoolName}}
        </el-button>


        <el-dialog title="选择学校" :visible.sync="dialogFormVisible" :width="dialogWidth">
          <el-form>

            <el-form-item label="学校名称" :label-width="formLabelWidth">
              <el-select v-model="selectSchool" placeholder="请选择所在学校">
                <el-option value="所有学校" label="所有学校"/>
                <el-option
                  v-for="item in schoolList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="boundSchool">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "TopNav",
    data() {
      return {
        login_status: '',
        log_user: '',
        selectSchool: '',
        formLabelWidth: '80px',
        schoolList: [],
        dialogFormVisible: false,
        selectedSchoolName: '',

      }
    },
    computed: {
      dialogWidth: function () {
           if (document.body.clientWidth>992){
             return "40%"
           }else{
             return "70%"
           }
      }
    },
    methods: {
      toCategory() {
        this.$router.push({name: 'Category', params: {cid: "1"}})
      },
      boundSchool() {

        if (this.selectSchool == "所有学校") {
          if (sessionStorage.getItem("school") != null) {
            sessionStorage.removeItem("school");
            this.selectedSchoolName = "选择学校";
          }
        } else {
          for (let i of this.schoolList) {
            if (i.name == this.selectSchool) {
              sessionStorage.setItem("school", JSON.stringify(i));
              break;
            }
          }
          this.selectedSchoolName = this.selectSchool;
        }
        this.dialogFormVisible = false;
        console.log(sessionStorage.getItem("school"));
      },
      toLogin: function () {
        this.$router.replace({
          path: '/signin'
        })
      },

      handleCommand(command) {
        this.$router.replace({
          path: command
        })

      },
      doLogOut: function () {
        if (this.login_status) {
          console.log("dologout");
          this.login_status = false;
          sessionStorage.removeItem("success_user");
          this.$message({
            message: '退出成功!',
            type: 'success',
            duration: 1000
          });
          this.$router.replace({
            path: '/'
          })
        }
      },
      initSchoolList() {
        var url = this.websiteUrl + '/demo1/school/';
        var that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code === 200) {
            that.schoolList = response.data.data;
          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log("schoolList exception")
        });
        if (sessionStorage.getItem("school") != null) {
          this.selectedSchoolName = JSON.parse(sessionStorage.getItem("school")).name;
        } else {
          this.selectedSchoolName = '选择学校';
        }


      }
    },
    mounted() {
      if (sessionStorage.getItem("success_user") != null) {
        this.log_user = JSON.parse(sessionStorage.getItem("success_user"));
        this.login_status = true;
      } else {
        this.login_status = false;
      }
      this.initSchoolList();
    }
  }
</script>

<style scoped>

  .el-menu-demo {
    background-color: #191e21;
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
  }

  .mytab {
    height: 50px;
  }

  span a:hover {
    color: red !important;
  }

  .dropdownmenu {
    top: 45px !important;
  }

  .mytabrow {
    background-color: #191e21;
    font-size: 16px;
    color: #f3f3f3;
    text-align: center;
  }

  .mytabrow span {
    line-height: 50px !important;
    color: #dedede;
  }

  .mytabrow a {
    color: #f3f3f3;
  }


</style>
