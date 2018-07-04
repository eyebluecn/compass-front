<template>
  <div class="backyard-preference">
    <div class="row">
      <div class="col-lg-12">
        <div class="pedia-navigation">
          <span class="item active">网站偏好</span>
        </div>
      </div>
      <div class="col-lg-12 text-right">
        <router-link class="btn btn-sm btn-primary" to="/by/preference/edit">
          <i class="fa fa-pencil"></i>
          修改
        </router-link>
      </div>
      <div class="col-lg-12">
        <div class="mt10 bg-white br4 border">
          <div class="row p10 border-bottom">
            <div class="col-md-2 col-sm-2 col-xs-4 bold">
              网站名称
            </div>
            <div class="col-md-10 col-sm-10 col-xs-8">
              {{preference.name}}
            </div>
          </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import Preference from '../../common/model/preference/Preference'

  export default {
    name: 'index',
    data() {
      return {
        preference: new Preference()
      }
    },
    methods: {},
    mounted() {
      this.preference.httpFetch()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .backyard-preference {
    .tankImg {
      max-height: 100px
    }
  }
</style>
