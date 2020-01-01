<template>
  <div>


    <el-row>
      <el-col :span="20" :offset="2">

        <div class="markdown-body" v-html="htmlContent" v-highlight>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="mavonEditor">
          <no-ssr>
            <mavon-editor v-model="mdContent" @change="change"/>
          </no-ssr>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Mymd",
    data() {
      return {
        mdContent: '',
        htmlContent: '',

      }

    },
    methods: {
      change(value, render) {
        // render 为 markdown 解析后的结果
        this.htmlContent = render;
        //this.article.mdcontent = this.plainContent
      },

      showMdContent: function () {
        console.log(this.mdContent);
      },

      showHtmlContent: function () {
        console.log(this.htmlContent);
      }
    }
  }
</script>

<style scoped>

</style>
