<template>
  <div>
    <el-upload
      action="http://localhost:8080/demo1/commons/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="1"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "FileUpload",

    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        this.filename=file.response.data;
      }
    },
    data() {
      return {
        filename:'',
        dialogImageUrl: '',
        dialogVisible: false
      }

    },

  }
</script>

<style scoped>
  input[type=file] {
  }
</style>
