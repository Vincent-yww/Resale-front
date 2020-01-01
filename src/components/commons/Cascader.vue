<template>
  <div>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"></el-cascader>
    <el-cascader-panel :options="options"></el-cascader-panel>
  </div>
</template>

<script>
  import
  {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  }
    from 'element-china-area-data'
  export default {

    name: "Cascader",
    data() {
      return {
        value: [],
        options: provinceAndCityData,
      }
    },
    methods: {
      handleChange(val) {
          console.log(val)

      }
    }
  }
</script>

<style scoped>

</style>
