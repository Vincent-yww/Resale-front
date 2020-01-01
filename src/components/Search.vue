<template>
  <div>
    <top-nav/>
    <search-nav/>
    <!--    面包屑导航-->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" style="margin-left: 100px"><span>首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item><span>搜索</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div id="wholepage">
      <div v-if="itemsPager.length>0">
        <el-row>
          <el-col class="itemblock" v-for="(item,ii) in itemsPager" :key="ii" style="margin: 0px 30px 20px 10px">
            <el-card :body-style="{ padding: '0px' }" class="card">
              <a @click="toGoodsInfo(item.id)">
                <el-image :src="item.pic"
                          class="image" :fit='fit'/>
                <div style="padding: 14px;">
                  <div style="height: 60px">{{item.name}}</div>
                  <div class="bottom clearfix">
                    <div class="pricespan">￥{{item.price}}</div>
                  </div>
                </div>
              </a>
            </el-card>
          </el-col>
        </el-row>

        <div id="items_pager" v-if="pageAmount">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="itemsList.length"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div v-if="itemsPager.length==0">
        <span>没有查询到商品</span>
      </div>
    </div>
  </div>
</template>

<script>
  import TopNav from "./commons/TopNav";
  import SearchNav from "./commons/SearchNav";

  export default {
    name: "Search",
    components: {SearchNav, TopNav},
    data() {
      return {
        itemsList: '',
        searchItem: '',
        value: '',
        schoolId: '',
        currentPage: 1,
        pageSize: 10,
        fit:'fit',
      }
    },
    computed: {
      itemsPager: function () {
        return this.itemsList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      },
      pageAmount: function () {
        return this.itemsList.length / this.pageSize > 1;
      }
    },
    methods: {
      initItemList() {
        let url = this.websiteUrl + "/demo1/goods/search";
        let that = this;
        this.axios.get(url, {
          params: {
            category: that.value,
            school: that.schoolId,
            searchItem: that.searchItem
          }
        }).then(function (resp) {
          if (resp.data.code === 200) {
            that.itemsList = resp.data.data;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      toGoodsInfo(id) {
        // this.$router.push({name: 'GoodsInfo', params: {goodsid: id}})
        window.location.href = '/goods/'+id;
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pageSize = size;
        console.log(this.pageSize)  //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      }
    },
    created() {
      this.searchItem = this.$route.query.searchItem;
      this.value = this.$route.query.category;
      if (sessionStorage.getItem("school") != null) {
        this.schoolId = JSON.parse(sessionStorage.getItem("school")).id;
      }
      this.initItemList();
    },
    mounted() {
    },
  }
</script>

<style scoped>
  #wholepage {
    position: absolute;
    height: 670px;
  }

  #items_pager {
    height: 50px;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
    left: 570px;
  }

  .card:hover {
    box-shadow: darkgrey 0px 12px 8px 0px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    margin: 0 auto;
    width: 171px;
    height: 171px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .itemblock {
    width: 220px;
    height: 281px;
  }


  .pricespan {
    color: #F03F45;
    font-size: 18px;
    text-align: left;
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
