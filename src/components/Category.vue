<template>
  <div>
    <TopNav/>
    <search-nav/>
    <!--    面包屑导航-->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" style="margin-left: 100px"><span>首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item><span>分类</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-tabs :tab-position="tabPosition" :stretch=true
               type="border-card" style="" v-model="selectedCategory">
        <el-tab-pane
          v-for="(c,index) in categoryList" :key="index"
          :label="c.cname"  class="categoryTabs" :name="c.cid.toString()">
          <div class="goodsList">
            <Items :search-condition='c.cid'/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import TopNav from "./commons/TopNav";
  import SearchNav from "./commons/SearchNav";
  import Items from "./commons/Items";

  export default {
    name: "Category",
    components: {Items, SearchNav, TopNav},
    data() {
      return {
        tabPosition: 'left',
        categoryList: [],
        selectedCategory: '1',
      }
    },
    computed: {},
    methods: {
      initCategory() {
        var url = this.websiteUrl + '/demo1/category/';
        var that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code === 200) {
            console.log(response.data);
            that.categoryList = response.data.data;

          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log("exception")
        });
      },
    },
    mounted() {
     this.selectedCategory= this.$route.params.cid==null?"1":this.$route.params.cid;
      this.initCategory();
    },
  }
</script>

<style scoped>

  @import "../assets/css/bootstrap.min.css";
  @import "../assets/css/bootstrap-select.css";
  @import "../assets/css/style.css";
  @import "../assets/css/flexslider.css";
  @import "../assets/css/font-awesome.min.css";
  @import "../assets/css/menu_sideslide.css";
  @import "../assets/css/jquery-ui1.css";
  @import "../assets/css/jquery.uls.grid.css";
  @import "../assets/css/jquery.uls.lcd.css";
  @import "../assets/css/easy-responsive-tabs.css";
  @import "../assets/css/jquery.uls.css";


  .goodsList {
    height: auto;
    width: auto;
  }

  .categoryTabs {
    height: auto;
  }

  .breadcrumb {
    height: 50px;
    font-size: 18px;
    background-color: #0099e5;
    color: #f3f3f3 !important;
    padding: 15px 10px;
  }

  .breadcrumb span {
    color: #f3f3f3 !important;
  }


</style>
