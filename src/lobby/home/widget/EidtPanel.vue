<template>

  <div>
    <div class="row" v-validator="site.validatorSchema.name.error">
      <label class="col-md-4 control-label mt5 compulsory">站点标题</label>
      <div class="col-md-8 validate">
        <input type="text" class="form-control" v-model="site.name">
      </div>
    </div>
    <div class="row mt15" v-validator="site.validatorSchema.url.error">
      <label class="col-md-4 control-label mt5 compulsory">站点链接</label>
      <div class="col-md-8 validate">
        <input type="text" class="form-control" v-model="site.url">
      </div>
    </div>
  </div>
</template>


<script>

  import Site from "../../../common/model/site/Site";

  export default {
    data() {
      return {

      }
    },
    components: {},
    props: {
      site: {
        type: Site,
        required: true
      }
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">


</style>


