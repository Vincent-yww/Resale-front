<template>
  <div>
    <top-nav></top-nav>
    <search-nav></search-nav>
    <section>
      <div id="agileits-sign-in-page" class="sign-in-wrapper">
        <div class="agileinfo_signin">
          <h3>注 册</h3>
          <el-form :model="reg_user" :rules="reg_rules" ref="reg_user" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="reg_user.username"/>
            </el-form-item>
            <el-row>
              <el-col :span="15">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="reg_user.phone"/>
                </el-form-item>
                <!--            <el-form-item label="电子邮箱" prop="email">-->
                <!--              <el-input v-model="reg_user.email"/>-->
                <!--            </el-form-item>-->

              </el-col>
              <el-col :span="5" :offset="2">
                <el-button @click="sendverification">发送验证码</el-button>
              </el-col>
            </el-row>
            <el-form-item label="验证码" prop="verification">
              <el-input v-model="reg_user.verification"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="reg_user.password" type="password"/>
            </el-form-item>
            <el-form-item label="选择学校" prop="school" class="schoolSelection">
              <el-select v-model="reg_user.school" placeholder="请选择所在学校">
                <el-option
                  v-for="item in schoolList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>

            </el-form-item>
            <el-row>
              <el-col :span="18">
                <el-form-item>
                  <el-button  @click="doReg('reg_user')" type="primary">注册</el-button>
                  <el-button  @click="toSignin" >登录</el-button>
                </el-form-item>

              </el-col>
            </el-row>

          </el-form>
        </div>
      </div>
    </section>
    <!-- //sign up form -->
  </div>
</template>

<script>
  import TopNav from "./commons/TopNav";
  import SearchNav from "./commons/SearchNav";

  export default {
    name: "SignUp",
    components: {SearchNav, TopNav},
    data() {
      return {
        reg_user: {
          username: '',
          phone: '',
          password: '',
          verification: '',
          token: '',
          email: '',
          school: '',
        },
        reg_rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},

          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          verification: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
          ],
        },
        schoolList: '',


      }
    },
    methods: {
      sendverification() {
        let url = this.websiteUrl + '/demo1/commons/mrcode?mobile=' + this.reg_user.phone;
        // let url = 'http://localhost:8080/demo1/commons/ercode?toEmail=' + this.reg_user.email;
        var that = this;
        this.axios.get(url).then(function (resp) {
          if (resp.data.code == 200) {
            that.reg_user.token = resp.data.data;
          } else {
            console.log("get token failed")
          }
        }).catch();
      },
      doReg(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
            let url = 'http://localhost:8080/demo1/users/reg';
            this.axios.post(url, this.reg_user).then(function (response) {
              if (response.data.code == 200) {
                console.log("注册成功用户对象->" + response.data.data);
                that.$message({
                  message: response.data.msg,
                  type: 'success'
                });
                that.$router.replace({
                  path: '/signin'
                })

              } else {
                that.$message({
                  message: response.data.msg,
                  type: 'error'
                });
              }
            }).catch(function (error) {
              that.$message({
                message: error.message,
                type: 'error'
              });
            })
          } else {
            return false;
          }
        });
      },
      doReg2() {
        var that = this;
        let url = 'http://localhost:8080/demo1/users/reg';
        this.axios.post(url, this.reg_user).then(function (response) {
          if (response.data.code == 200) {
            console.log("注册成功用户对象->" + response.data.data);
            that.$message({
              message: response.data.msg,
              type: 'success'
            });
            that.$router.replace({
              path: '/signin'
            })

          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: error.message,
            type: 'error'
          });
        })
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
      },
      toSignin(){
        this.$router.push({path:"/signin"});
      }
    },
    mounted() {
      this.initSchoolList();
    }
  }
</script>

<style scoped>
  .schoolSelection input {
    margin: 0 !important;
  }
</style>
