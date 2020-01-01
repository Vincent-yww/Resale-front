<template>
  <div>
    <top-nav/>
    <search-nav/>

    <!--    <section>-->
    <div id="agileits-sign-in-page" class="sign-in-wrapper">

      <div class="agileinfo_signin">

        <h3 style="color: blue">登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 录</h3>
        <hr>
        <el-form :model="users" :rules="usersRules" ref="users" label-width="80px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="users.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="users.password" type="password"/>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码" prop="verification" size="large">
                <el-input v-model="users.verification"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <img style="cursor:pointer;margin-left:30px" title="看不清换一张" :src="randomCodeUrl" @click="changeRandomCode" alt="">
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="7" :offset="2">
              <el-form-item>
                <el-button type="" @click="doLogin('users')" type="primary">登录</el-button>
              </el-form-item>

            </el-col>
            <el-col :span="4" :offset="2">
              <el-form-item>
                <el-button type="" @click="toSignUp">注册</el-button>
              </el-form-item>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="5">
              <el-form-item>
                <a href="" id="forgetpwd">忘记密码?</a>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>


      </div>
    </div>
    <!--    </section>-->
  </div>

</template>

<script>
  import TopNav from "./commons/TopNav";
  import SearchNav from "./commons/SearchNav";

  export default {
    name: "SignIn",
    components: {SearchNav, TopNav},
    props: {
      fontSizeMin: {
        type: Number,
        default: 32
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 20
      },
      colorMax: {
        type: Number,
        default: 40
      },
      lineColorMin: {
        type: Number,
        default: 20
      },
      lineColorMax: {
        type: Number,
        default: 80
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 136
      },
      contentHeight: {
        type: Number,
        default: 48
      }

    },
    data() {
      return {
        token: '',
        identifyCode: '',
        msg: '',
        validate: false,  //默认滑块验证没通过
        text: '拖动滑块完成拼图',
        randomCodeUrl: '',
        users: {
          username: '',
          password: '',
          verification: '',
          rememberpwd: false,
          token:''
        },
        usersRules: {
          username: [
            {required: true, message: '请输入用户名'},

          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          verification: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
        }

      }
    },
    methods: {
      doLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url =this.websiteUrl+'/demo1/users/login';
            let that = this;
            this.users.token=this.token;
            console.log(this.token);
            console.log(this.users)
            this.axios.post(url, this.users)
              .then(function (response) {
                if (response.data.code == 200) {
                  console.log("登录成功用户对象->" + response.data.data);
                  that.loginSuccessUser = response.data.data;
                  sessionStorage.setItem("success_user",JSON.stringify(that.loginSuccessUser));
                  that.$message({
                    message: "登陆成功！",
                    type: 'success'
                  });
                  that.$router.replace({
                    path: '/'
                  })

                } else {
                  that.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                }
              }).catch(function (error) {
              that.$message({
                message: '登录失败！',
                type: 'error'
              });
            })
          } else {
            return false;
          }
        });


      },

      changeRandomCode: function () {
        const jwt = require('jsonwebtoken');
        let payload = new Date().getTime() + ""; //当前时间的毫秒数
        let secret = 'www.simoniu.com'; //网站的域名
        this.token = jwt.sign(payload, secret);//那你的公钥+私钥，生成唯一token

        this.randomCodeUrl = this.websiteUrl+'/demo1/commons/hutoolRandomCodeImage?token=' + this.token;
        console.log("send request")
      }
      ,
      toSignUp() {
        this.$router.push({
          name: 'SignUp'
        })
      },
//点击生成随机数 并传给调用它的组件（父组件用changeCode接收）
// 生成一个随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor(min, max) {
        var r = this.randomNum(min, max)
        var g = this.randomNum(min, max)
        var b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic() {
        var canvas = document.getElementById('s-canvas')
        var ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
        ctx.fillStyle = this.randomColor(
          this.backgroundColorMin,
          this.backgroundColorMax
        )
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },
      drawText(ctx, txt, i) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font =
          this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine(ctx) {
        // 绘制干扰线
        for (let i = 0; i < 8; i++) {
          ctx.strokeStyle = this.randomColor(
            this.lineColorMin,
            this.lineColorMax
          )
          ctx.beginPath()
          ctx.moveTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.lineTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.stroke()
        }
      },
      drawDot(ctx) {
        // 绘制干扰点
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight),
            1,
            0,
            2 * Math.PI
          )
          ctx.fill()
        }
      }

    },
    watch: {
      // identifyCode() {
      //   this.drawPic()
      // }
    }
    ,
    mounted() {
      // this.drawPic();
      // this.handleClick()
      this.changeRandomCode();
    }

  }
</script>

<style scoped>

  .agileinfo_signin {
    padding-left: 0;
    padding-right: 0px;
  }


  .forgot a:hover {
    color: red;
  }

  .demo-ruleForm {
    padding-right: 40px;
  }

  #forgetpwd:hover {
    color: red;
  }

</style>
