<template>
  <div class="version-detail">


    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						版本详情
					</span>
        </div>
        <div class="text-right mb10">
          <router-link class="btn btn-sm btn-primary" :to="'/by/version/edit/'+version.uuid">
            <i class="fa fa-pencil"></i>
            编辑版本
          </router-link>
        </div>
      </div>
    </div>


    <div class="bg-white border br4 p10">

      <div class="media">
        <div class="media-body">
          <div class="cell-title">
						<span>
              {{version.name}}
            </span>
          </div>
          <div class="col-md-6 pl0">
            <div class="cell-content">
              <div class="mt5">
                <i class="fa text-success"
                   :class="[version.platform === 'ANDROID' ? version.getPlatformMap().ANDROID.icon : '',version.platform === 'IOS' ? version.getPlatformMap().IOS.icon : '',version.platform === 'WEB' ? version.getPlatformMap().WEB.icon : '']"></i>
                {{version.platform}}
              </div>
            </div>
            <div class="cell-content">
              <div class="mt5">
                唯一标识：{{version.identifier}}
              </div>
              <div class="mt5">
                版本名称：{{version.versionName}}
              </div>

              <div class="mt5">
                版本号：{{version.versionCode}}
              </div>
              <div class="mt5">
                版本描述：{{version.description}}
              </div>
              <div class="mt5">
                主页：{{version.homepageUrl}}
              </div>
              <div class="mt5">
                是否支持：{{version.enabled ? '支持' : '不支持'}}
              </div>
            </div>
          </div>
          <div class="col-md-6 text-right" v-if="version.platform === 'ANDROID'">
            <a :href="version.apkUrl">
              <button class="btn btn-sm btn-primary">
                <i class="fa fa-download">下载</i>
              </button>
            </a>
          </div>

          <div class="mt5 col-md-12 pl0">
            <span class="mr10">创建时间: {{version.createTime | simpleDateTime}}</span>
            <span class="mr10">最新修改时间: {{version.updateTime | simpleDateTime}}</span>
          </div>

          <div class="col-md-12" v-if="version.platform === 'ANDROID'">
            <img :src="qrcode"/>
          </div>
        </div>
      </div>


    </div>
  </div>

</template>
<script>

  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import Version from '../../common/model/version/Version'


  import LoadingFrame from '../widget/LoadingFrame'

  import NbBtnDropdown from '../../common/widget/NbBtnDropdown.vue'


  export default {
    data() {
      return {
        version: new Version()
      }
    },
    watch: {},
    computed: {
      qrcode() {
        return '/api/support/qrcode/fetch?content=' + this.version.apkUrl
      }
    },
    methods: {},
    components: {
      NbSlidePanel,
      LoadingFrame,
      NbBtnDropdown
    },
    mounted() {
      this.version.uuid = this.$store.state.route.params.uuid
      this.version.httpDetail()
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

  .version-detail {

  }

</style>
