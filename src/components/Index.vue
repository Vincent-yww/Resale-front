<template>
  <div>
    <!--    <div class="agiletopbar">-->
    <!--      <div class="wthreenavigation">-->
    <!--        -->
    <!--      </div>-->
    <!--      <div class="clearfix"></div>-->
    <!--    </div>-->
    <!-- //Navigation -->
    <!-- header -->
    <header>
      <top-nav></top-nav>
      <search-nav></search-nav>
    </header>
    <!-- //header -->
    <!-- Slider -->
    <div class="slider">
      <el-carousel indicator-position="outside" class="rslides" id="slider" :interval="2000" arrow="never">
        <el-carousel-item v-for="(item,index) in carouselList" :key="index" class="w3ls-slide-text">
          <h3>{{item.h3}}</h3>
          <a @click="toCategory(item.url)" class="w3layouts-explore-all">{{item.a}}</a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- //Slider -->


    <!-- content-starts-here -->
    <div class="main-content">
      <div class="w3-categories">
        <h3>热门分类</h3>
        <div class="container">
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder1">
              <a class="btn-8" href="/category/1">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-mobile"></i></div>
                    <h4 class="clrchg">手机</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder2">
              <a class="btn-8" href="/category/2">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-laptop"></i></div>
                    <h4 class="clrchg">电脑平板</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder3">
              <a class="btn-8" href="category/3">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-motorcycle"></i></div>
                    <h4 class="clrchg">出行工具</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder4">
              <a class="btn-8" href="category/4">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="el-icon-paperclip"></i></div>
                    <h4 class="clrchg">文具用品</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder5">
              <a class="btn-8" href="category/5">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="el-icon-basketball"></i></div>
                    <h4 class="clrchg">健身器材</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder6">
              <a class="btn-8" href="category/6">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-paw"></i></div>
                    <h4 class="clrchg">宠物用品</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder7">
              <a class="btn-8" href="category/7">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-book"></i></div>
                    <h4 class="clrchg">书刊杂志</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder9">
              <a class="btn-8" href="category/8">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-gamepad"></i></div>
                    <h4 class="clrchg">游戏主机</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder10">
              <a class="btn-8" href="category/9">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-shield"></i></div>
                    <h4 class="clrchg">时尚美妆</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder11">
              <a class="btn-8" href="category/10">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-coffee"></i></div>
                    <h4 class="clrchg">饮料</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder12">
              <a class="btn-8" href="category/11">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-cutlery"></i></div>
                    <h4 class="clrchg">小吃零食</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3">
            <div class="focus-grid w3layouts-boder8">
              <a class="btn-8" href="category/12">
                <div class="focus-border">
                  <div class="focus-layout">
                    <div class="focus-image"><i class="fa fa-asterisk"></i></div>
                    <h4 class="clrchg">其他</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <!-- most-popular-ads -->
      <div class="w3l-popular-ads">
        <h3>热门单品</h3>
        <div class="w3l-popular-ads-info">
          <div class="col-md-4 w3ls-portfolio-left" v-for="(item,index) in popGoodsList" :key="index">
            <div class="portfolio-img event-img">
              <img :src="item.pic" class="img-responsive" alt=""/>
              <div class="over-image"></div>
            </div>
            <div class="portfolio-description">
              <h4><a >{{item.name}}</a></h4>
              <p>{{item.desc}}</p>
              <span class="pricespan">￥{{item.price}}</span>
              <a @click="toGoods(item.id)">
                <span>点击查看</span>
              </a>
            </div>
            <div class="clearfix"></div>
          </div>


          <div class="clearfix"></div>
        </div>
      </div>
      <!-- most-popular-ads -->


    </div>
    <!--footer section start-->
    <footer>
      <div class="w3-agileits-footer-top">

      </div>
      <div class="agileits-footer-bottom text-center">
        <div class="container">
          <div class="w3-footer-logo">
            <h1><a href="index.html"><span>Re</span>sale-v2</a></h1>
          </div>

          <div class="clearfix"></div>
        </div>
      </div>
    </footer>
  </div>
</template>
<!--<script src="../assets/js/main.js"></script>-->
<!--<script src="../assets/js/classie.js"></script>-->
<!--<script src="../assets/js/jquery.min.js"></script>-->
<!--<script src="../assets/js/bootstrap-select.js"></script>-->
<!--<script src="../assets/js/bootstrap.js"></script>-->
<!--<script src="../assets/js/jquery.leanModal.min.js"></script>-->
<!--<script src="../assets/js/jquery.uls.data.js"></script>-->
<!--<script src="../assets/js/jquery.uls.data.utils.js"></script>-->
<!--<script src="../assets/js/jquery.uls.lcd.js"></script>-->
<!--<script src="../assets/js/jquery.uls.languagefilter.js"></script>-->
<!--<script src="../assets/js/jquery.uls.regionfilter.js"></script>-->
<!--<script src="../assets/js/jquery.uls.core.js"></script>-->
<!--<script src="../assets/js/jquery.flexisel.js"></script>-->
<!--<script src="../assets/js/responsiveslides.min.js"></script>-->
<!--<script src="../assets/js/move-top.js"></script>-->
<!--<script src="../assets/js/easing.js"></script>-->
<script>
  import TopNav from "./commons/TopNav";
  import SearchNav from "./commons/SearchNav";

  export default {
    name: 'Index',
    components: {SearchNav, TopNav},
    data() {
      return {
        carouselList: [
          {
            h3: '看看别人分享的物品',
            a: '浏览所有分类',
            url: "1"
          }, {
            h3: '分享自己的闲置物品',
            a: '立刻上传',
            url: "2"
          }, {
            h3: '发现新的惊喜',
            a: '点击查看',
            url: "1"
          },

        ],
        popGoodsList: '',
      }
    },
    methods: {
      toCategory(url) {
        console.log(url);
        if (url == "1") {
          this.$router.push({name: 'Category', query: {cid: "1"}})
        } else if (url == '2') {
          this.$router.push({name: 'AddGoods'})
        }
      },
      toGoods(id){
        window.location.href='/goods/'+id;
      },
      initPopGoodsList() {
        let url = this.websiteUrl + '/demo1/goods/all';
        var that = this;
        this.axios.get(url).then(function (resp) {
          if (resp.data.code === 200) {
            console.log(resp.data.data);
            that.popGoodsList = resp.data.data;
            that.popGoodsList = that.popGoodsList.slice(0, 7);
          } else {
            console.log(resp.data);
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
    },


    mounted() {
      this.initPopGoodsList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.portfolio-img{
  height: 220px;
}
  .img-responsive{
    height: 220px;
  }
  .pricespan{
    font-size: 14px;
    color: #FF4B49;
  }

</style>
