<template>
  <div>
    <el-row class="SearchRow">
      <el-col :md='{span: 2, offset:1}' :xs="{span:2,offset:2}">
        <el-button @click="drawer = true" type="primary" style="" class="menu-button">

        </el-button>

        <el-drawer
          :with-header="false"
          :size="drawerSize"
          :visible.sync="drawer"
          :direction="direction"
        >
          <div id="drawer">
            <ul>
              <li><a href="/category/1"><i class="fa fa-fw fa-mobile"></i><span>手机</span></a></li>
              <li><a href="/category/2"><i class="fa fa-fw fa-laptop"></i><span>电脑平板</span></a></li>
              <li><a href="category/3"><i class="fa fa-fw fa-motorcycle"></i><span>出行工具</span></a></li>
              <li><a href="category/4"><i class="el-icon-paperclip"></i><span>文具用品</span></a></li>
              <li><a href="category/5"><i class="el-icon-basketball"></i><span>健身器材</span></a></li>
              <li><a href="category/6"><i class="fa fa-fw fa-paw"></i><span>宠物用品</span></a></li>
              <li><a href="category/7"><i class="fa fa-fw fa-book"></i><span>书刊杂志</span></a></li>
              <li><a href="category/8"><i class="fa fa-fw fa-gamepad"></i><span>游戏主机</span></a></li>
              <li><a href="category/9"><i class="fa fa-fw fa-shield"></i><span>时尚美妆</span></a></li>
              <li><a href="category/10"><i class="fa fa-fw fa-coffee"></i><span>饮料</span></a></li>
              <li><a href="category/11"><i class="fa fa-fw fa-cutlery"></i><span>小吃零食</span></a></li>
              <li><a href="category/12"><i class="fa fa-fw fa-asterisk"></i><span>其他</span></a></li>
            </ul>
          </div>

        </el-drawer>
      </el-col>
      <el-col  :md='{span: 3, offset:3}' :xs="{span:10,offset:7}">
        <div class="logo">
          <h1 style="margin: 5px 0 0px"><a @click="toIndex"><span>Re</span>sale</a></h1>
        </div>
      </el-col>
      <el-col :md='{span: 5, offset:2}' :xs="{span:16,offset:4}">
        <el-input
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          v-model="searchItem"
          style="margin: 15px 0px 0px"
        >
        </el-input>

      </el-col>
      <el-col :md="4" :xs="{span:10,offset:4}">
        <el-select v-model="value" filterable placeholder="全部类别" style="margin: 15px 0px 0px">
          <el-option
            v-for="item in categoryList"
            :key="item.cid"
            :label="item.cname"
            :value="item.cid"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :md="2" :xs="{span:5,offset:1}">
        <el-button type="primary" icon="el-icon-search" style="margin: 15px 0px 0px" @click="handleSearch">查找
        </el-button>
      </el-col>
    </el-row>


    <div class="clearfix"></div>
    <hr>


  </div>
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
  export default {
    name: "SearchNav",
    data() {
      return {
        drawer: false,
        direction: 'ltr',
        categoryList: '',
        value: '',
        searchItem: '',
      }
    },
    computed:{
      drawerSize:function () {
        if (document.body.clientWidth>992){
          return "20%"
        }else{
          return "40%"
        }
      }
    },
    methods: {
      handleSearch() {
        this.$router.push({name: 'Search', query: {searchItem: this.searchItem, category: this.value}})
      },
      toIndex() {
        this.$router.push({
          name: 'Index'
        })
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
          console.log(" initCategoryList exception")
        });
      },

    },
    mounted() {
      this.initCategoryList();
    }
  }
</script>

<style scoped>
  hr {
    margin-bottom: 2px;
  }

  #drawer {
    height: 100%;
    background-color: #333333;
  }

  #drawer ul {
    padding-top: 30px;
  }

  #drawer li {
    /*color: #f3f3f3;*/
    font-size: larger;
    text-align: left;
    margin-bottom: 10px;
    padding: 10px 0px 10px 16px;
  }

  #drawer li:hover {
    border-left: 3px solid #eeeeee;
    background: #191e21;
  }

  #drawer li a {
    color: #f3f3f3;
  }

  li a:hover {
    color: #ff4c4c
  }

  li a span {
    padding-left: 10px;
  }

  .menu-button {
    z-index: 1000;
    margin: 6px;
    padding: 0;
    width: 2.5em;
    height: 2.25em;
    border: none;
    text-indent: 2.5em;
    font-size: 1.5em;
    color: transparent;
    background: transparent;
    outline: none;
    top: 4px !important;
  }

  .menu-button:active {
    outline: none;
  }

  .menu-button::before {
    top: 0.5em;
    right: 0.5em;
    bottom: 0.5em;
    left: 0.5em;
    background: linear-gradient(#373a47 20%, transparent 20%, transparent 40%, #373a47 40%, #373a47 60%, transparent 60%, transparent 80%, #373a47 80%);
    content: '';
  }

  .menu-button:hover {
    opacity: 0.6;
  }

</style>
