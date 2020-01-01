<template>
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
      <span>该分类还没有商品</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Items",
    props: {
      searchCondition: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        itemsList: [],
        pageSize: 10,
        currentPage: 1,
        category: '',
        fit: 'cover',
        schoolId: '',
      }
    },
    mounted() {
      this.category = this.searchCondition;
      if (sessionStorage.getItem("school") != null) {
        this.schoolId = JSON.parse(sessionStorage.getItem("school")).id;
      }
      this.initItemList();
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
      toGoodsInfo(id) {
        //this.$router.replace({name: 'GoodsInfo', params: {goodsid: id}})
        window.location.href = '/goods/'+id;
      },

      initItemList() {
        var condition = this.category === '' ? "all" : "category/" + this.category;
        let url = this.websiteUrl + '/demo1/goods/' + condition;
        var that = this;
        this.axios.get(url, {
          params: {
            school: that.schoolId,
          }
        }).then(function (resp) {
          if (resp.data.code === 200) {
            console.log(resp.data.data);
            that.itemsList = resp.data.data;

          } else {
            console.log(resp.data);
          }
        }).catch(function (error) {
          console.log(error);
        })
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

  }
</script>

<style scoped>
  #wholepage {
    height: 680px;
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
</style>
