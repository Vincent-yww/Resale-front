<template>
  <div>
    <top-nav></top-nav>
    <!--    面包屑导航-->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" style="margin-left: 100px"><span>首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item><span>添加商品</span></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :md="{span:12,offset:4}" :xs="{span:20,offset:2}">
        <el-form ref="goods" :model="goods" label-width="80px" :label-position="labelPosition">

          <el-form-item label="商品名称">
            <el-input v-model="goods.name"></el-input>
          </el-form-item>

          <el-form-item label="商品类别">
            <el-select v-model="goods.category" placeholder="请选择商品类别">
              <el-option
                v-for="item in categoryList"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model.number="goods.price" ></el-input>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input v-model="goods.desc"></el-input>
          </el-form-item>
          <el-form-item label="添加商品预览图">
            <el-upload
              action="http://115.28.184.217:8080/demo1/commons/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :limit="1"

            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item label="商品详情">
            <el-input v-model="goods.detail"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6}"/>
          </el-form-item>
          <el-form-item label="商品新旧程度">
            <el-select v-model="goods.condition" placeholder="请选择">
              <el-option
                v-for="(item,ii) in conditonList"
                :key="ii"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="添加商品详情图(最多5张)">
            <el-upload
              action="http://115.28.184.217:8080/demo1/commons/upload"
              list-type="picture-card"

              :on-remove="handleRemove"
              :on-success="handleSuccess1"

              :limit="5"

            ><i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible1">
              <img width="100%" :src="dialogImageUrl1" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="test">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TopNav from "./commons/TopNav";

  export default {
    name: "AddGoods",
    components: {TopNav},
    data() {
      return {
        labelPosition:'right',
        goods: {
          price: "",
          name: "",
          category: "",
          desc: "",
          fromuser: "",
          pic: "",
          detail: "",
          detailimgs: "",
          school: '',
          condition: ''
        },
        categoryList: '',
        filename: '',
        dialogImageUrl: '',
        dialogVisible: false,
        dialogImageUrl1: '',
        dialogVisible1: false,
        loginUser: {},
        detailimgsList: [],
        conditonList: ["全新仅拆封", "九成九新 ", "九成新 ", "七成新 ", "五成新 ", "使用时间较长"],
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      test() {
        this.goods.detailimgs = this.detailimgsList.toString().substring(0, this.detailimgsList.toString().length);
        console.log(this.goods);
      },
      initCategoryList() {
        var url = this.websiteUrl + '/demo1/category/';
        var that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code === 200) {
            that.categoryList = response.data.data;
          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log("exception")
        });
      },
      onSubmit() {
        var url = this.websiteUrl + '/demo1/goods/add';
        this.goods.fromuser = this.loginUser.uid;
        this.goods.school = this.loginUser.school;
        this.goods.detailimgs = this.detailimgsList.toString().substring(0, this.detailimgsList.toString().length);
        var that = this;
        this.axios.post(url, this.goods).then(function (resp) {
          if (resp.data.code === 200) {
            console.log(resp.data);
            that.$message({
              message: '创建成功',
              type: 'success'
            });
          } else {
            that.$message({
              message: resp.data.message,
              type: 'warning'
            });
          }
        }).catch(function (resp) {
          console.log(resp)
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.detailimgsList.pop(this.resourceUrl + file.response.data);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureCardPreview1(file) {
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        console.log(file);
        this.goods.pic = this.resourceUrl + response.data;
      },
      handleSuccess1(response, file, fileList) {
        console.log(response);
        this.detailimgsList.push(this.resourceUrl + response.data);
      }


    },
    mounted() {
      if (sessionStorage.getItem('success_user') == null) {
        this.$message.error('请先登录');
        this.$router.replace({
          path: '/signin'
        })
      } else {
        this.loginUser = JSON.parse(sessionStorage.getItem('success_user'));
      }
      this.initCategoryList();
    }
  }
</script>

<style scoped>

</style>
