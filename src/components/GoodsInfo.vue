<template>
  <div>
    <top-nav/>
    <search-nav/>
    <!--    面包屑导航-->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" style="margin-left: 100px"><span>首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item><span @click="toCategory" style="cursor: pointer">分类</span></el-breadcrumb-item>
      <el-breadcrumb-item  ><span>商品详情</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="single-page main-grid-border">
      <div class="container">
        <div class="product-desc">
          <div class="col-md-7 product-view">
            <h2 style="text-align: center">{{mygoods.name}}</h2>
            <br>
            <h5 style="text-align: center"><i class="glyphicon glyphicon-map-marker"></i>{{mygoods.schoolName}}</h5>
            <div class="flexslider">
              <el-carousel class="rslides" id="slider" :interval="2000" arrow="always">
                <el-carousel-item v-for="(item,index) in imgList" :key="index" >
                  <el-image :src="item" fit="contain"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="product-details">
              <h4><span class="w3layouts-agileinfo">简  介</span>:<span>{{mygoods.desc}}</span>
                <div class="clearfix"></div>
              </h4>
              <h4><span class="w3layouts-agileinfo">商品详情</span>:<p>{{mygoods.detail}}</p>
                <div class="clearfix"></div>
              </h4>

            </div>
          </div>
          <div class="col-md-5 product-details-grid">
            <div class="item-price">
              <div class="product-price">
                <p class="p-price">价格</p>
                <h3 class="rate">￥{{mygoods.price}}</h3>
                <div class="clearfix"></div>
              </div>
              <div class="condition">
                <p class="p-price">新旧程度</p>
                <h4>{{mygoods.condition}}</h4>
                <div class="clearfix"></div>
              </div>
              <div class="itemtype">
                <p class="p-price">物品分类</p>
                <h4><a @click="toCategory">{{mygoods.categoryName}}</a></h4>
                <div class="clearfix"></div>
              </div>
            </div>
            <div class="interested text-center">
              <h4>对此感兴趣？<small> 联系商家</small></h4>
              <button type="button" class="btn btn-default btn-lg btn-block" @click="open">立即购买</button>
            </div>
            <div class="tips">
              <h4>购买须知</h4>
              <ol>
                <li><a href="#">本网站不支持退换货，请考虑清楚后购买</a></li>
                <li><a href="#">本网站不支持退换货，请考虑清楚后购买</a></li>
                <li><a href="#">本网站不支持退换货，请考虑清楚后购买</a></li>
              </ol>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopNav from "./commons/TopNav";
  import SearchNav from "./commons/SearchNav";
  import AddGoods from "./AddGoods";

  export default {
    name: "GoodsInfo",
    components: {AddGoods, SearchNav, TopNav},
    data() {
      return {
        mygoods: '',
        fromuser: '',
        goodsId: '',
        imgList: {},
      }
    },
    methods: {
      open(){
        const h = this.$createElement;
        this.$notify({
          title: '公告',
          message: h('i', { style: 'color: teal'}, '支付功能尚未实现，不能购买')
        });
      },
      initGoodsInfo() {
        let url = this.websiteUrl + '/demo1/goods/getone';
        var that = this;
        this.axios(url, {params: {goodsId: that.goodsId}}).then(function (resp) {
          if (resp.data.code === 200) {
            that.mygoods = resp.data.data;
            console.log(that.mygoods);
            if (that.mygoods.detailimgs == null) {
              that.imgList = that.mygoods.pic;
            } else {
              that.imgList = that.mygoods.detailimgs.split(',');
            }
          } else {
            console.log(resp.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      toCategory(){
        this.$router.push({name:'Category',params:{cid:this.mygoods.category.toString()}})
      }
    },
    mounted() {

      // 取到路由带过来的参数
      this.goodsId = parseInt(this.$route.params.goodsid);
      // 将数据放在当前组件的数据内
      this.initGoodsInfo();
    },

  }
</script>

<style scoped>
  .interested .btn{
    font-size: 20px;
    height: 50px;
    margin-top: 20px;
  }
  #slider{
    text-align: center;
  }
</style>
